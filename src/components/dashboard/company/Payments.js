import React from "react";
import "./Payments.css";

const Payments = () => {
  return (
    <div className=" sm:m-3">
      <p className="text-center m-5">Payments</p>
      <div className="flex flex-col bg-blur-lg inset-0 bg-opacity-5 bg-white backdrop-blur-xl rounded-xl relative mt-8 overflow-hidden">
        <div className="flex w-full p-2">
          <div className="flex w-full p-4">
            <div className="payments-section payments-section-balance">
              <h6 className="desc-payments">Current balance</h6>
              <p>
                <span className="js-balance value">$0.0</span>
              </p>
            </div>
            <div className="payments-section payments-section-balance2">
              <h6 className="desc-payments">Withdrawn balance</h6>
              <p>
                <span className="js-balance value">$0.0</span>
              </p>
            </div>
          </div>
        </div>
        <section className="panel p-5 text-black">
          <div className="payments-withdrawn withdrawn-flex">
            <div className="inline-block js-withdrawn payments-withdrawn-title">
              <form
                className="simple_form form-dashboard js-withdrawn-submit"
                noValidate
                id="new_payment_request"
                action="/payment_requests"
                acceptCharset="UTF-8"
                data-remote="true"
                method="post"
              >
                <input type="hidden" name="utf8" value="✓" />
                <input
                  type="hidden"
                  name="one_time_token"
                  id="one_time_token"
                  value="8b89265ae3f6b10b576f5e4022030dff-payment_requests-create"
                />
                <div className="form-group">
                  <h2 className="desc-payments mb-3">Withdrawal</h2>
                  <p className="text-lg mt-8">
                    You can't withdraw funds if your balance is empty or you
                    have no wallet
                  </p>
                </div>
                <div className="form-group flex align-items-end">
                  <div className="medium">
                    <div className="input string optional disabled payment_request_bounty">
                      <input
                        className="string optional disabled"
                        placeholder="Min: $100"
                        type="text"
                        name="payment_request[bounty]"
                        id="payment_request_bounty"
                      />
                    </div>
                  </div>
                  <div className="dashboard-select__container small margin-b-xs margin-l-small">
                    <select
                      className="js-currencies-select"
                      hidden
                      name="payment_request[currency_id]"
                      id="payment_request_currency_id"
                    ></select>
                  </div>
                  <input
                    type="submit"
                    name="commit"
                    value="Submit"
                    className="btn btn-disabled small"
                    disabled
                    data-disable-with="Submit"
                  />
                </div>
              </form>
            </div>
            <div className="payments-withdrawn-coupon"></div>
          </div>
        </section>
        <section className="spend p-5">
          <div className="earned-payments-block">
            <div className="clearfix">
              <h2 className="desc-payments">Earned</h2>
            </div>
            <p>Amount rewarded to me</p>
          </div>
          <div id="earned-bounty">
            <div className="earned-spend-items flex">
              <div className="stats-reports stats-reports-block justify-between">
                <div className="payments-block-text">
                  <div className="desc-payments-small">Total earned</div>
                  <div className="truncate">
                    <span>$0.0</span>
                  </div>
                </div>
                <div className="earned-icons earned-icons-total"></div>
              </div>
              <div className="stats-reports stats-reports-block justify-between">
                <div className="payments-block-text">
                  <div className="desc-payments-small">Referral bonuses</div>
                  <div className="truncate">
                    <span>$0.0</span>
                  </div>
                </div>
                <div className="earned-icons earned-icons-lowest"></div>
              </div>
              <div className="stats-reports stats-reports-block justify-between">
                <div className="payments-block-text">
                  <div className="desc-payments-small">On the average</div>
                  <div className="truncate">
                    <span>$0.0</span>
                  </div>
                </div>
                <div className="earned-icons earned-icons-average"></div>
              </div>
              <div className="stats-reports stats-reports-block justify-between">
                <div className="payments-block-text">
                  <div className="desc-payments-small">Pending reward</div>
                  <div className="truncate">
                    <span>$0.0</span>
                  </div>
                </div>
                <div className="earned-icons earned-icons-pending"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payments;
