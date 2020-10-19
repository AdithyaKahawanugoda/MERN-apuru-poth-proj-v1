module.exports = (data) => {
  const today = new Date();

  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
          <center><h1>Apuru Poth Publishers</h1></center>
          <center><h3>~sample ledger~</h3></center>
          <br>
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="https://img2.pngio.com/cartoon-bird-clipart-owl-drawing-illustration-transparent-cute-owl-drawings-png-900_895.png"
                               style="width:100%; max-width:156px;"></td>
                            
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               <h2>Publishing Title: ${
                                 data.publishingTitle
                               }</h2>
                            </td>
                            <td>
                               <h2>ISBN: ${data.ISBN}</h2>
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr>
                <td>
                               Date: ${`${today.getDate()}. ${
                                 today.getMonth() + 1
                               }. ${today.getFullYear()}`}
                            </td>
                </tr>
                <tr class="heading">
                   <h3><td>Expenses:</td></h3>
                   <td> </td>
                   <td> </td>
                </tr>
                <tr class="item">
                   <td>Translator payment :</td>
                   <td><i>(${data.translator}) </i></td>
                   <td>LKR ${data.writerPayment}</td>
                </tr>
                <tr class="item">
                   <td>License :</td>
                   <td><i>(${data.license}) </i></td>
                   <td>LKR ${data.licenseCost}</td>
                </tr>
                <tr class="item">
                   <td>Print cost :</td>
                   <td><i>(${data.press}) </i></td>
                   <td>LKR ${data.printCost}</td>
                </tr>
                <tr class="item">
                   <td>Cover :</td>
                   <td><i>(${data.coverDesigner}) </i></td>
                   <td>LKR ${data.coverCost}</td>
                </tr>
                <tr class="item">
                   <td>Proof Reading :</td>
                   <td><i>(${data.proofReader}) </i></td>
                   <td>LKR ${data.proofReadingPayment}</td>
                </tr>
                <tr class="item">
                   <td>Page/Type setting :</td>
                   <td><i>(${data.typeSetter}) </i></td>
                   <td>LKR ${data.typeSetterPayment}</td>
                </tr>
                <tr class="item">
                   <td>Other expenses :</td>
                   <td> </td>
                   <td>LKR ${data.other}</td>
                </tr>
                <tr class="item">
                   <td>Total expenses </td>
                   <td> </td>
                   <td>LKR ${
                     parseInt(data.coverCost) +
                     parseInt(data.writerPayment) +
                     parseInt(data.printCost) +
                     parseInt(data.licenseCost) +
                     parseInt(data.proofReadingPayment) +
                     parseInt(data.typeSetterPayment) +
                     parseInt(data.other)
                   }</td>
                </tr>
                <tr class="item">
                   <td>Printed Units</td>
                   <td>(${data.quantity}) x </td>
                   <td>LKR ${data.marketPrice}</td>
                </tr>
             </table>
             <br />
             <h2 class="justify-center">Estimated income: LKR ${
               parseInt(data.quantity) * parseInt(data.marketPrice) -
               (parseInt(data.coverCost) +
                 parseInt(data.writerPayment) +
                 parseInt(data.printCost) +
                 parseInt(data.licenseCost) +
                 parseInt(data.proofReadingPayment) +
                 parseInt(data.typeSetterPayment) +
                 parseInt(data.other))
             }</h2>
          </div>
       </body>
    </html>
    `;
};
