const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");

/**
 * Release on hold transction
 *
 * Removes transaction when status is ON_HOLD
 * and updates the wallet amount with holded amount
 *
 * @param {Wallet} wallet  Wallet object
 * @param {Transction} transaction  Transaction object
 * @return {Wallet} Updated wallet object
 */
exports.releaseTransaction = async (wallet, transaction) => {
  const trx = await Wallet.startTransaction();
  try {
    const updatedWallet = await Wallet.query(trx).patchAndFetchById(wallet.id, {
      amount: wallet.amount + Math.abs(transaction.amount),
      hold_amount: wallet.hold_amount - Math.abs(transaction.amount)
    });

    await Transaction.query(trx).deleteById(transaction.id);

    await trx.commit();
    return updatedWallet;
  } catch (err) {
    await trx.rollback();
    return false;
  }
};
