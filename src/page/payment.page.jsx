import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hook/useAxios.hook";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const { fetchData, loading } = useAxios();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const loadBookingDetails = useCallback(async () => {
    const result = await fetchData({
      url: `/bookings/${bookingId}`,
      method: "get",
    });
    if (result && result.booking) {
      setBooking(result.booking);
    }
  }, [bookingId, fetchData]);

  useEffect(() => {
    loadBookingDetails();
  }, [loadBookingDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      bookingId: Number.parseInt(bookingId),
      paymentMethod,
      amount: booking.totalAmount,
    };

    const result = await fetchData({
      url: "/payments",
      method: "post",
      data: paymentData,
    });

    if (result && result.payment) {
      alert("Payment successful! Your booking is confirmed.");
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Payment</h2>

          {booking && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Booking Summary</h5>
                <p className="mb-1">
                  <strong>Booking ID:</strong> {booking.id}
                </p>
                <p className="mb-1">
                  <strong>Number of Seats:</strong> {booking.numberOfSeats}
                </p>
                <p className="mb-0">
                  <strong>Total Amount:</strong> ${booking.totalAmount}
                </p>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Payment Details</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                {paymentMethod === "card" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Card Holder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardDetails.cardHolderName}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cardHolderName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cardNumber: e.target.value,
                          })
                        }
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiryDate: e.target.value,
                            })
                          }
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value,
                            })
                          }
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="card bg-light mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <strong>Total Amount to Pay:</strong>
                      <strong className="text-primary">
                        ${booking?.totalAmount}
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 btn-lg"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Complete Payment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
