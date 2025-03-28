export const TransactionHistory = () => {
  return (
    <div className="transaction-history-container">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
            <th></th>
              <th>Ordered By</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Ordered</th>
              <th>Arrived</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
