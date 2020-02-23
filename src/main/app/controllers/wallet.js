const _ = require('lodash');
const Joi = require('@hapi/joi');
const WalletModel = require('../models/wallet');
const {
    codes
} = require('../../config/api');
const {
    sendResponse
} = require('../helpers/api');

class Wallet {

    /**
     * Get wallet by id
     * @param {*} req 
     * @param {*} res 
     */
    static async getById(req, res) {
        /** check if wallet exitsts */
        const wallet = await WalletModel.query().findOne({
            guid: req.params.id
        });

        if (!wallet) {
            return sendResponse(res, codes.NOT_FOUND, false, 'NOT_FOUND', 'Wallet not found');
        }

        return sendResponse(res, codes.OK, true, 'OK', 'Wallet fetched successfully', _.omit(wallet, ['id']));

    }


    /**
     * Deletes wallet by reuqested id
     * @param {*} req 
     * @param {*} res 
     */
    static async delete(req, res) {
        /** check if wallet exitsts */
        const wallet = await WalletModel.query().findOne({
            guid: req.params.id
        });

        if (!wallet) {
            return sendResponse(res, codes.NOT_FOUND, false, 'NOT_FOUND', 'Wallet not found');
        }

        await wallet.$query().delete();
        return sendResponse(res, codes.OK, true, 'OK', 'Wallet deleted successfully.');
    }

    /**
     * Returns all wallets in db
     * @param {*} req 
     * @param {*} res 
     */
    static async all(req, res) {

        /** validate input */
        const {
            error
        } = Joi.object({
            skip: Joi.number().min(0).optional(),
            take: Joi.number().min(0).optional(),
        }).validate(req.query);

        if (error) {
            return sendResponse(res, codes.BAD_REQUEST, false, 'BAD_REQUEST', error.message);
        }


        const wallets = await WalletModel.query()
            .select('guid', 'amount', 'hold_amount', 'used_amount', 'created_at', 'updated_at')
            .orderBy('created_at', 'desc')
            .limit(req.query.take)
            .offset(req.query.skip);

        sendResponse(res, codes.OK, true, 'OK', "Wallets fetched successfully", wallets);
    }

    /**
     * Creates new wallet record
     * @param {*} req 
     * @param {*} res 
     */
    static async create(req, res) {

        const wallet = await WalletModel.query().insertAndFetch({
            amount: 0.00,
            hold_amount: 0.00,
            used_amount: 0.00
        });

        sendResponse(res, codes.CREATED, true, 'CREATED', "Wallet created successfully.", _.omit(wallet, ['id']));
    }

}

module.exports = Wallet;