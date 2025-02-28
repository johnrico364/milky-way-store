export const OrderHistoryDetails = () => {
  return (
    <div className="order-history">
      <div className="card card-side bg-base-100 h-48">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Nido Pigrolac</h2>
          <div className="details">
            <div>Click the button to watch on Jetflix app.</div>
            <div>
              <b>Order:</b> Niad312jkkncaoi131od
            </div>
            <div><b>Price: </b> P 3,122</div>
            <div className="mt-4 text-end"> Ordered 4 days ago </div>
          </div>
        </div>
      </div>
    </div>
  );
};
