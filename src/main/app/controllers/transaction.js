const _ = require("lodash");
const Joi = require("@hapi/joi");
const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");
const date = require("../helpers/date");
const { codes, constants } = require("../../config/api");
const { sendResponse } = require("../helpers/api");

class TransactionController {
  /**
   * Search transaction
   * Search transaction by transaction_id, reference_id, status, wallet guid
   * @param {*} req
   * @param {*} res
   */
  static async searchTransaction(req, res) {
    const { error } = Joi.object({
      wallet_id: Joi.string()
        .length(36)
        .optional()
        .empty(""),
      reference_id: Joi.string()
        .min(1)
        .max(128)
        .optional()
        .empty(""),
      transaction_id: Joi.string()
        .length(36)
        .optional()
        .empty(""),
      status: Joi.any()
        .valid(constants.ON_HOLD, constants.RELEASED, constants.COMPLETED)
        .optional()
        .empty(""),
      skip: Joi.number()
        .min(0)
        .optional()
        .empty(""),
      take: Joi.number()
        .min(0)
        .optional()
        .empty("")
    }).validate(req.query);

    if (error) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        error.message
      );
    }

    let transactions = Transaction.query();

    if (req.query.wallet_id) {
      const wallet = await Wallet.getByGuid(req.query.wallet_id);
      transactions = transactions.where("wallet_id", wallet.id);
    }

    if (req.query.reference_id) {
      transactions = transactions.where("reference_id", req.query.reference_id);
    }

    if (req.query.transaction_id) {
      transactions = transactions.where(
        "transaction_id",
        req.query.transaction_id
      );
    }

    if (req.query.status) {
      transactions = transactions.where("status", req.query.status);
    }

    transactions = await transactions
      .orderBy("created_at", "desc")
      .withGraphFetched("wallet")
      .limit(req.query.take)
      .offset(req.query.skip);

    return sendResponse(
      res,
      codes.OK,
      true,
      "OK",
      "Transactions fetched successfully",
      transactions
    );
  }

  /**
   * Update transaction record
   * This controller can only update reference_id, description, expires_at
   * If transaction only in hold
   * @param {*} req
   * @param {*} res
   */
  static async update(req, res) {
    /** request validation */
    const { error } = Joi.object({
      reference_id: Joi.string()
        .min(1)
        .max(128)
        .optional(),
      expires_at: date.isSameOrAfter(),
      description: Joi.string()
        .min(0)
        .max(256)
        .optional()
    }).validate(req.body);

    if (error) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        error.message
      );
    }

    /** fetch wallet by guid and check if reference id exists */
    const [wallet, isReferenceUnique, transaction] = await Promise.all([
      Wallet.getByGuid(req.params.id),
      Transaction.isReferenceUnique(req.params.txnid, req.body.reference_id),
      Transaction.getByTxnId(req.params.txnid)
    ]);

    if (!wallet || !isReferenceUnique || !transaction) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        "Bad requeest or duplicate reference_id"
      );
    }

    const updatedTransaction = await transaction.$query().patchAndFetch({
      reference_id: req.body.reference_id
        ? req.body.reference_id
        : transaction.reference_id,
      description: req.body.description
        ? req.body.description
        : transaction.description,
      expires_at: req.body.expires_at
        ? req.body.expires_at
        : transaction.expires_at
    });

    return sendResponse(
      res,
      codes.OK,
      true,
      "OK",
      "Transaction updated successfully",
      _.omit(updatedTransaction, ["id", "wallet_id"])
    );
  }

  /**
   * Get single transaction by id
   * @param {*} req
   * @param {*} res
   */
  static async getById(req, res) {
    const wallet = await Wallet.getByGuid(req.params.id); // get walllet by id
    const transaction = await Transaction.query().findOne({
      wallet_id: wallet ? wallet.id : 0,
      transaction_id: req.params.txnid
    });

    if (!transaction) {
      return sendResponse(
        res,
        codes.NOT_FOUND,
        false,
        "NOT_FOUND",
        "Transaction not found"
      );
    }

    return sendResponse(
      res,
      codes.OK,
      true,
      "OK",
      "Transaction fetched successfully",
      _.omit(transaction, ["id", "wallet_id"])
    );
  }

  /**
   * Get all transactions of a particular wallet
   * @param {*} req
   * @param {*} res
   */
  static async all(req, res) {
    /** validate input */
    const { error } = Joi.object({
      skip: Joi.number()
        .min(0)
        .optional(),
      take: Joi.number()
        .min(0)
        .optional()
    }).validate(req.query);

    if (error) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        error.message
      );
    }

    const wallet = await Wallet.getByGuid(req.params.id); // get walllet by id

    const transactions = await Transaction.query()
      .where("wallet_id", wallet.id)
      .select(
        "transaction_id",
        "reference_id",
        "pre_amount",
        "amount",
        "post_amount",
        "expires_at",
        "status",
        "description",
        "created_at",
        "updated_at"
      )
      .orderBy("created_at", "desc")
      .limit(req.query.take)
      .offset(req.query.skip);

    sendResponse(
      res,
      codes.OK,
      true,
      "OK",
      "Transactions fetched successfully",
      transactions
    );
  }

  /**
   * Add balance to wallet
   * @param {*} req
   * @param {*} res
   */
  static async credit(req, res) {
    /** validate input */
    const { error } = Joi.object({
      reference_id: Joi.string()
        .min(1)
        .max(128)
        .required(),
      amount: Joi.number()
        .min(0.01)
        .required(),
      description: Joi.string()
        .min(1)
        .max(256)
        .required()
    }).validate(req.body);

    if (error) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        error.message
      );
    }

    /** fetch wallet by guid and check if reference id exists */
    const [wallet, isReferenceExists] = await Promise.all([
      Wallet.getByGuid(req.params.id),
      Transaction.isReferenceExist(req.body.reference_id)
    ]);

    if (!wallet || isReferenceExists) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        "Bad requeest or duplicate reference_id"
      );
    }

    const trx = await Wallet.startTransaction();

    try {
      const updatedWallet = await Wallet.query(trx).patchAndFetchById(
        wallet.id,
        {
          amount: wallet.amount + req.body.amount
        }
      );

      const transaction = await Transaction.query(trx).insertAndFetch({
        wallet_id: wallet.id,
        reference_id: req.body.reference_id,
        pre_amount: wallet.amount,
        amount: req.body.amount,
        post_amount: updatedWallet.amount,
        status: constants.COMPLETED,
        description: req.body.description
      });

      await trx.commit();

      sendResponse(
        res,
        codes.OK,
        true,
        "CREDITED",
        "Wallet credited successfully",
        {
          updatedWallet: _.omit(updatedWallet, ["id"]),
          transaction: _.omit(transaction, ["id", "wallet_id"])
        }
      );
    } catch (err) {
      await trx.rollback();
      return sendResponse(
        res,
        codes.INTERNAL_SERVER_ERROR,
        false,
        "INTERNAL_SERVER_ERROR",
        "Failed to credit wallet."
      );
    }
  }

  /**
   * creates new on hold transaction for debit wallet
   */
  static async initDebit(req, res) {
    /** request validation */
    const { error } = Joi.object({
      reference_id: Joi.string()
        .min(1)
        .max(128)
        .required(),
      amount: Joi.number()
        .min(0.01)
        .required(),
      expires_at: date.isSameOrAfter(),
      description: Joi.string()
        .min(0)
        .max(256)
        .required()
    }).validate(req.body);

    if (error) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        error.message
      );
    }

    /** fetch wallet by guid and check if reference id exists */
    const [wallet, isReferenceExists] = await Promise.all([
      Wallet.getByGuid(req.params.id),
      Transaction.isReferenceExist(req.body.reference_id)
    ]);

    if (!wallet || isReferenceExists) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        "Bad requeest or duplicate reference_id"
      );
    }

    /** check wallet balance is less than requested */
    if (wallet.amount < req.body.amount) {
      return sendResponse(
        res,
        codes.NOT_ACCEPTABLE,
        false,
        "NOT_ACCEPTABLE",
        "Wallet balance is lower than requested amount"
      );
    }

    /** onhold process goes here */
    const trx = await Wallet.startTransaction();

    try {
      const updatedWallet = await Wallet.query(trx).patchAndFetchById(
        wallet.id,
        {
          amount: wallet.amount - req.body.amount,
          hold_amount: wallet.hold_amount + req.body.amount
        }
      );

      const transaction = await Transaction.query(trx).insertAndFetch({
        wallet_id: wallet.id,
        reference_id: req.body.reference_id,
        pre_amount: wallet.amount,
        amount: -req.body.amount, // add minus(-) to the transcation amount
        post_amount: updatedWallet.amount,
        status: constants.ON_HOLD,
        expires_at: req.body.expires_at,
        description: req.body.description
      });

      await trx.commit();

      sendResponse(
        res,
        codes.OK,
        true,
        "INITIATED",
        "Request initiated successfully",
        {
          updatedWallet: _.omit(updatedWallet, ["id"]),
          transaction: _.omit(transaction, ["id", "wallet_id"])
        }
      );
    } catch (err) {
      await trx.rollback();
      return sendResponse(
        res,
        codes.INTERNAL_SERVER_ERROR,
        false,
        "INTERNAL_SERVER_ERROR",
        "Failed to initiate payment."
      );
    }
  }

  /**
   * Release on hold
   * @param {*} req
   * @param {*} res
   */
  static async release(req, res) {
    /** fetch wallet by guid and and transaction by txnid */
    const [wallet, transaction] = await Promise.all([
      Wallet.getByGuid(req.params.id),
      Transaction.getByTxnId(req.params.txnid)
    ]);

    if (!wallet || !transaction || transaction.status !== constants.ON_HOLD) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        "Wallet or transaction does not exists"
      );
    }

    /** release process starts here */
    const trx = await Wallet.startTransaction();

    try {
      const updatedWallet = await Wallet.query(trx).patchAndFetchById(
        wallet.id,
        {
          amount: wallet.amount + Math.abs(transaction.amount),
          hold_amount: wallet.hold_amount - Math.abs(transaction.amount)
        }
      );

      await Transaction.query(trx).deleteById(transaction.id);

      await trx.commit();

      sendResponse(
        res,
        codes.OK,
        true,
        "RELEASED",
        "Transaction released successfully.",
        {
          updatedWallet: _.omit(updatedWallet, ["id"])
        }
      );
    } catch (err) {
      await trx.rollback();
      return sendResponse(
        res,
        codes.INTERNAL_SERVER_ERROR,
        false,
        "INTERNAL_SERVER_ERROR",
        "Failed to release transaction"
      );
    }
  }

  /**
   * Completes a payment
   * @param {*} req
   * @param {*} res
   */
  static async complete(req, res) {
    /** fetch wallet by guid and and transaction by txnid */
    const [wallet, transaction] = await Promise.all([
      Wallet.getByGuid(req.params.id),
      Transaction.getByTxnId(req.params.txnid)
    ]);

    if (!wallet || !transaction || transaction.status !== constants.ON_HOLD) {
      return sendResponse(
        res,
        codes.BAD_REQUEST,
        false,
        "BAD_REQUEST",
        "Wallet or transaction does not exists"
      );
    }

    /** complete process starts here */
    const trx = await Wallet.startTransaction();

    try {
      const updatedWallet = await Wallet.query(trx).patchAndFetchById(
        wallet.id,
        {
          hold_amount: wallet.hold_amount - Math.abs(transaction.amount)
        }
      );

      const updatedTransaction = await Transaction.query(trx).patchAndFetchById(
        transaction.id,
        {
          status: constants.COMPLETED,
          expires_at: null
        }
      );

      await trx.commit();

      sendResponse(
        res,
        codes.OK,
        true,
        "COMPLETED",
        "Transaction completed successfully.",
        {
          updatedWallet: _.omit(updatedWallet, ["id"]),
          updatedTransaction: _.omit(updatedTransaction, ["id", "wallet_id"])
        }
      );
    } catch (err) {
      await trx.rollback();
      return sendResponse(
        res,
        codes.INTERNAL_SERVER_ERROR,
        false,
        "INTERNAL_SERVER_ERROR",
        "Failed to complete transaction"
      );
    }
  }
}

module.exports = TransactionController;
