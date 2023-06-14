import { useState, useEffect } from "react";
import './memos.css'
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <>
      <p style={{ textAlign: "center", marginTop: "20px" }}>Messages</p>
      {memos.map((memo) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#FFD95A",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "150px",
                      fontFamily:"monospace",
                      fontSize:"20px",
                      // border:" solid black ",
                      borderRadius:"10px"
                    }}
                    >
                    {memo.name}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#FFD95A",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                      fontSize:"20px"
                    }}
                    >
                    {/* {new Date(memo.timestamp * 1000).toLocaleString()} */}
                    {String(memo.timestamp)}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#FFD95A",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                      fontSize:"20px"
                    }}
                    >
                    {memo.message}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#FFD95A",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "0px",
                      fontSize:"20px"
                    }}
                  >
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};
export default Memos;