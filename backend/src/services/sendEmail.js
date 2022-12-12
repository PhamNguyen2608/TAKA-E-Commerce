require('dotenv').config();
const nodemailer = require('nodemailer');

let sendEmailCreateUser = async (recieverEmail) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"TAKA SHOP👻" <anhtaibnvn12112001@gmail.com>', // sender address
    to: recieverEmail, // list of receivers
    subject: 'Hello ✔', // Subject line
    html: `
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tbody><tr>
      <td align="center" border="0">
        
        <table style="width:100%" cellpadding="0" cellspacing="0" border="0">
          <tbody><tr>
            <td align="center" border="0">
              <table style="width:100%" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr>
                  <td align="center" style="margin-left:0px;margin-right:0px;padding:20px 0px 20px 0px" border="0">
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
        
        
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width:800px" border="0">
          <tbody><tr>
            <td align="center" style="background-color:#ffffff" bgcolor="#ffffff" border="0">
              
              <table style="max-width:740px;width:100%" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr>
                  <td align="center" style="margin-left:0px;margin-right:0px;padding:0px 15px 0px 15px" border="0">
                    <table style="width:100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody><tr>
                        <td style="border-bottom:3px solid #72bf00;padding:20px 0px 20px 0px">
                          <table style="width:100%" cellpadding="0" cellspacing="0" border="0">
                            <tbody><tr>
                              <td style="font-size:0px;padding:0px 1px 0px 1px" border="0">
                                <table style="width:100%" cellpadding="0" cellspacing="0" border="0">
                                  <tbody><tr>
                                    <td align="left" valign="middle" style="width:68%;font-size:0px;min-height:1px" border="0">
                                      <table style="width:100%;max-width:100%;border-collapse:collapse;word-break:break-word" cellpadding="0" cellspacing="0" border="0">
                                        <tbody><tr>
                                          <td width="21" style="vertical-align:middle;border-collapse:collapse;word-break:break-word" border="0">
                                            <a href="tel:1900545413" style="font-family:'SF Pro Text',Arial,sans-serif;text-align:left;text-decoration:none;color:#4a4a4a" target="_blank">
                                              <img src="https://ci3.googleusercontent.com/proxy/bId7S0T_NjybZI8IPAEVgHGXfwNTK3UoV-Huko6Z1HUKXMnH7XN6qjBpHueE3k5UonoGPZ9NJIEuCae0qx1cDyt9nw4sSqrMIHeMaMcic_oxV1PBpUvobx_Z4hUgxF6X6VGFLmkPFi-tvWX7uNfmUkLT47Nd6VMm_js=s0-d-e1-ft#https://design.vnpay.vn/web/vcb/vcb-digibank/html/page-components/email/builder-2/dist/images/phone.png" width="16" alt="phone" style="width:16px;max-width:100%;display:inline-block;height:auto" border="0" height="16" class="CToWUd">
                                            </a>
                                          </td>
                                          <td width="130" style="vertical-align:middle;border-collapse:collapse;word-break:break-word" border="0">
                                            <a href="tel:1900545413" style="font-family:'SF Pro Text',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;text-decoration:none;color:#00381a" target="_blank">
                                              1900 54 54 13
                                            </a>
                                          </td>
                                          <td style="border-collapse:collapse;word-break:break-word" border="0"></td>
                                        </tr>
                                        <tr>
                                          <td width="21" style="vertical-align:middle;border-collapse:collapse;word-break:break-word" border="0">
                                            <a href="https://portal.vietcombank.com.vn" style="font-family:'SF Pro Text',Arial,sans-serif;text-align:left;text-decoration:none;color:#4a4a4a" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://portal.vietcombank.com.vn&amp;source=gmail&amp;ust=1653878477179000&amp;usg=AOvVaw1aKqyozivNQZSmuOKxV5n9">
                                              <img src="https://ci6.googleusercontent.com/proxy/VvJGhkCnN6cyx7M2JgH4HXLTiSYbBh0Z-zkAMNQl2jkhwL2UtNvDX_rN7q9ZnzfVYmQl6fnjS3f1EAgfyerVYhCcu1_t4a39TM_xBPJ1M2MnNXrlBYK8w4IbDF4nd1gIzFbwRyWb9tEoLupYNnux3LuxSaXA8d8v-S8=s0-d-e1-ft#https://design.vnpay.vn/web/vcb/vcb-digibank/html/page-components/email/builder-2/dist/images/globe.png" width="17" alt="tiki" style="width:17px;max-width:100%;display:inline-block;height:auto" border="0" height="17" class="CToWUd">
                                            </a>
                                          </td>
                                          <td width="230" style="vertical-align:middle;border-collapse:collapse;word-break:break-word" border="0">
                                            <a href="https://portal.vietcombank.com.vn" style="font-family:'SF Pro Text',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;text-decoration:none;color:#00381a" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://portal.vietcombank.com.vn&amp;source=gmail&amp;ust=1653878477180000&amp;usg=AOvVaw1s9ii5vORArTfRRvl_4_9U">
                                              https://portal.vietcombank.<wbr>com.vn
                                            </a>
                                          </td>
                                          <td style="border-collapse:collapse;word-break:break-word" border="0"></td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                    <td align="left" valign="middle" style="width:32%;font-size:0px;min-height:1px" border="0">
                                      <p style="font-family:'SF Pro Text',Arial,sans-serif;font-size:12px;line-height:16px;text-align:right;margin:0px;color:#4a4a4a">
                                        <img src="https://salt.tikicdn.com/cache/w500/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png" width="90" alt="LOGO TIKI" style="width:135px;max-width:100%;display:inline-block;height:auto" border="0" height="54.5" class="CToWUd">
                                      </p>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                          </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding:30px 0px 20px 0px" border="0">
                          <p style="font-family:'SF Pro Text',Arial,sans-serif;font-size:24px;line-height:29px;text-align:center;margin:0px;color:#4a4a4a">
                            <b>Hóa đơn thanh toán</b>
                            <br>
                            <b style="font-size:16px;line-height:24px">(Bill)</b>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:14px;line-height:20px;padding:0px 0px 30px 0px" border="0">
                          <table style="width:100%;max-width:100%;border-collapse:collapse;word-break:break-word;min-width:640px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5" cellpadding="0" cellspacing="0" border="0">
                            <tbody><tr>
                              <td width="200" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Ngày, giờ giao dịch</b><br>
                                <i>Trans. Date, Time</i>
                              </td>
                              <td colspan="3" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                19:05 Thứ Bảy 21/05/2022</td>
                            </tr>
                            <tr>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Số lệnh giao dịch</b><br>
                                <i>Order Number</i>
                              </td>
                              <td colspan="3" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                2040741822</td>
                            </tr>
                            <tr>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Tài khoản nguồn</b><br>
                                <i>Debit Account</i>
                              </td>
                              <td colspan="3" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                1026817960</td>
                            </tr>
                            <tr>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Tài khoản hưởng</b><br>
                                <i>Credit Account</i>
                              </td>
                              <td colspan="3" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                0451000402651</td>
                            </tr>
                            <tr>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Mã hóa đơn/Mã khách hàng</b><br>
                                <i>Bill code/Customer code</i>
                              </td>
                              <td colspan="3" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                0359321856</td>
                            </tr>
                            <tr>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Số tiền</b><br>
                                <i>Amount</i>
                              </td>
                              <td colspan="3" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                50,000 VND</td>
                            </tr>
                            <tr>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Loại phí</b><br>
                                <i>Charge Code </i>
                              </td>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                Người chuyển trả<br>
                                <i>Exclude </i>
                              </td>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Số tiền phí</b><br>
                                <i>Charge Amount<br>Net income<br>VAT</i>
                              </td>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                0 VND <br>&nbsp;<br> 0 VND <br> 0 VND</td>
                            </tr>
                            <tr>
                              <td style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                <b>Nội dung thanh toán</b><br>
                                <i>Details of Payment </i>
                              </td>
                              <td colspan="3" style="font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px">
                                MBVCB.2040741822.TOPUP Viettel 0359321856 50000</td>
                            </tr>
                          </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:0px 0px 30px 0px" border="0">
                          <p style="font-family:'SF Pro Text',Arial,sans-serif;font-size:16px;line-height:24px;text-align:center;margin:0px;color:#4a4a4a">
                            <b>Cám ơn Quý khách đã tin tưởng và sử dụng dịch vụ của TAKA!</b><br><i>Thank you for choosing
                            TAKA!</i>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding:0px 0px 30px 0px" border="0">
                          <p style="font-family:'SF Pro Text',Arial,sans-serif;font-size:14px;line-height:20px;text-align:justify;margin:0px;color:#4a4a4a">
                            <span style="font-family:'SF Pro Text',Arial,sans-serif;color:rgb(74,74,74);text-align:left">Lưu
                              ý</span>: Biên lai chuyển tiền này không thay cho các cam kết của NHTMCP Ngoại Thương Việt
                            Nam về các nghĩa vụ của khách hàng được xác nhận với bên thứ ba.<br>
                            <i>This confirmation is not Vietcombank's commitment regarding customer's obligation with
                              third party.</i>
                            <br><br><span style="font-family:'SF Pro Text',Arial,sans-serif;color:rgb(74,74,74);text-align:left">Để
                              đảm bảo an toàn bảo mật, bảo vệ quyền và lợi ích của chính mình, khi thực hiện các giao
                              dịch trên các kênh ngân hàng điện tử của Vietcombank, Quý khách vui lòng <b>đọc kỹ và tuân
                                theo các thông tin hướng dẫn giao dịch an toàn </b> <a href="https://portal.vietcombank.com.vn/content/News/Vietcombank/PublishingImages/OldNews/15062017_huong_dan_gd_nhdt.pdf" style="font-family:'SF Pro Text',Arial,sans-serif;text-align:left;color:#72bf00" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://portal.vietcombank.com.vn/content/News/Vietcombank/PublishingImages/OldNews/15062017_huong_dan_gd_nhdt.pdf&amp;source=gmail&amp;ust=1653878477180000&amp;usg=AOvVaw3g2rPnPG4_MQWcct9gIDYr">
                                tại đây</a>.</span>
                            <br><br><span style="font-family:'SF Pro Text',Arial,sans-serif;color:rgb(74,74,74);text-align:left">Mọi
                              thông tin chi tiết, truy cập website <a href="https://portal.vietcombank.com.vn" style="font-family:'SF Pro Text',Arial,sans-serif;text-align:left;color:#4a4a4a" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://portal.vietcombank.com.vn&amp;source=gmail&amp;ust=1653878477180000&amp;usg=AOvVaw1s9ii5vORArTfRRvl_4_9U">https://portal.vietcombank.<wbr>com.vn</a>
                              hoặc liên hệ Trung tâm hỗ trợ khách hàng 24/7 <b>1900 54 54 13</b></span>
                            <br><br><span style="font-family:'SF Pro Text',Arial,sans-serif;color:rgb(74,74,74);text-align:left"><i>To
                                ensure safety and security as well as to protect your rights and benefits, when making
                                transactions via Vietcombank e-channels, please read carefully and follow transaction
                                instructions <a style="font-family:'SF Pro Text',Arial,sans-serif;text-align:left;color:#4a4a4a">here</a></i></span>
                            <br><br><span style="font-family:'SF Pro Text',Arial,sans-serif;color:rgb(74,74,74);text-align:left"><i>For
                                further infomation, please direct your inquiries to:</i></span>
                            <br><br><span style="font-family:'SF Pro Text',Arial,sans-serif;color:rgb(74,74,74);text-align:left"><i>-
                                Our website: <a href="https://portal.vietcombank.com.vn" style="font-family:'SF Pro Text',Arial,sans-serif;text-align:left;color:#4a4a4a" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://portal.vietcombank.com.vn&amp;source=gmail&amp;ust=1653878477180000&amp;usg=AOvVaw1s9ii5vORArTfRRvl_4_9U">https://portal.vietcombank.<wbr>com.vn</a></i></span>
                            <br><br><span style="font-family:'SF Pro Text',Arial,sans-serif;color:rgb(74,74,74);text-align:left"><i>-
                                Our 24-hour Customer service: 1900 54 54 13</i></span>
                          </p>
                        </td>
                      </tr>
                      
                
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
              
            </td>
          </tr>
        </tbody></table>
        
        
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width:800px" border="0">
          <tbody><tr>
            <td align="center" style="padding:0px 0px 30px 0px" border="0">
            </td>
          </tr>
        </tbody></table>
        
      </td>
    </tr>
  </tbody></table>
    `, // html body
  });
};

let sendMailOrderProducts = async (data) => {
  const { address, user, order_items, item_price, quantity } = data;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let sum = 0;
  const mailOptions = {
    from: '"Nguyễn Tiến Tài 👻" <anhtaibnvn12112001@gmail.com>',
    to: user.email,
    subject: 'Shop Tiến Tài',
    html: `
      <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xác nhận đơn hàng</title>
  </head>

  <body>

      <table align="center" bgcolor="#dcf0f8" border="0" cellpadding="0" cellspacing="0"
          style="margin:0;padding:0;background-color:#f2f2f2;width:100%!important;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px"
          width="100%">
          <tbody>
              <tr>
                  <td align="center"
                      style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal"
                      valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" style="margin-top:15px" width="600">
                          <tbody>
                              <tr style="background:#fff">
                                  <td align="left" height="auto" style="padding:15px" width="600">
                                      <table>
                                          <tbody>
                                              <tr>
                                                  <td>
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                          <tbody>
                                                              <tr>
                                                                  <td>
                                                                      <a href="https://kltn-client-v1.vercel.app" style="display:block;margin-bottom: 20px;"
                                                                          target="_blank">
                                                                          <img alt=""
                                                                              src="https://salt.tikicdn.com/cache/w500/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png"
                                                                              style="border-radius: 50%;width: 50px; height: 50px;display:block; text-align: center;margin: 0 auto;">
                                                                      </a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <h1
                                                          style="font-size:17px;font-weight:bold;color:#444;padding:0 0 5px 0;margin:0">
                                                          Cảm ơn quý khách ${
                                                            user.first_name +
                                                            user.last_name
                                                          } đã đặt hàng tại TaKa-Shop,</h1>

                                                      <p
                                                          style="margin:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                          TAKA-Shop rất vui thông báo đơn hàng #${
                                                            data._id
                                                          } của quý khách đã được tiếp nhận
                                                          và
                                                          xác nhận. TAKA-Shop sẽ thông báo đến quý khách ngay khi hàng
                                                          chuẩn
                                                          bị được giao.</p>

                                                      <h3
                                                          style="font-size:13px;font-weight:bold;color:#02acea;text-transform:uppercase;margin:20px 0 0 0;border-bottom:1px solid #ddd">
                                                          Thông tin đơn hàng #${
                                                            data._id
                                                          } <span
                                                              style="font-size:12px;color:#777;text-transform:none;font-weight:normal">(${
                                                                data.createdAt
                                                              })</span></h3>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td
                                                      style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                          <thead>
                                                              <tr>
                                                                  <th align="left"
                                                                      style="padding:6px 9px 0px 9px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;font-weight:bold"
                                                                      width="50%">Thông tin thanh toán</th>
                                                                  <th align="left"
                                                                      style="padding:6px 9px 0px 9px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;font-weight:bold"
                                                                      width="50%"> Địa chỉ giao hàng </th>
                                                              </tr>
                                                          </thead>
                                                          <tbody>
                                                              <tr>
                                                                  <td style="padding:3px 9px 9px 9px;border-top:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal"
                                                                      valign="top"><span style="text-transform:capitalize">${
                                                                        user.first_name +
                                                                        user.last_name
                                                                      }</span><br>
                                                                      <a href="mailto:${
                                                                        user.email
                                                                      }"
                                                                          target="_blank">${
                                                                            user.email
                                                                          }</a><br>
                                                                      0382345678
                                                                  </td>
                                                                  <td style="padding:3px 9px 9px 9px;border-top:0;border-left:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal"
                                                                      valign="top">
                                                                      ${
                                                                        address.street
                                                                      }, ${
      address.ward.name
    }, ${address.district.name}, ${address.province.name}<br>

                                                                  </td>
                                                              </tr>
                                                              <tr>
                                                                  <td colspan="2"
                                                                      style="padding:7px 9px 0px 9px;border-top:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444"
                                                                      valign="top">
                                                                      <p
                                                                          style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                                          <strong>Phương thức thanh toán: </strong>${
                                                                            data.payment_type ===
                                                                            'COD'
                                                                              ? 'Thanh toán khi nhận hàng'
                                                                              : 'Đã thanh toán'
                                                                          }

                                                                          <br>
                                                                          <strong>Phí vận chuyển: </strong> ${data.service_total.toLocaleString(
                                                                            'it-IT',
                                                                            {
                                                                              style:
                                                                                'currency',
                                                                              currency:
                                                                                'VND',
                                                                            }
                                                                          )}<br>
                                                                      </p>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <p
                                                          style="margin:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                          <i>Lưu ý: Đối với đơn hàng đã được thanh toán trước, nhân viên giao nhận có
                                                              thể
                                                              yêu cầu người nhận hàng cung cấp CMND / giấy phép lái xe để chụp ảnh
                                                              hoặc
                                                              ghi lại thông tin.</i>
                                                      </p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <h2
                                                          style="text-align:left;margin:10px 0;border-bottom:1px solid #ddd;padding-bottom:5px;font-size:13px;color:#02acea">
                                                          CHI TIẾT ĐƠN HÀNG</h2>

                                                      <table border="0" cellpadding="0" cellspacing="0" style="background:#f5f5f5"
                                                          width="100%">
                                                          <thead>
                                                              <tr>
                                                                  <th align="left" bgcolor="#02acea"
                                                                      style="padding:6px 9px;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">
                                                                      Sản phẩm</th>
                                                                  <th align="left" bgcolor="#02acea"
                                                                      style="padding:6px 9px;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">
                                                                      Đơn giá</th>
                                                                  <th align="left" bgcolor="#02acea"
                                                                      style="padding:6px 9px;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">
                                                                      Số lượng</th>
                                                                  <th align="left" bgcolor="#02acea"
                                                                      style="padding:6px 9px;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">
                                                                      Giảm giá</th>
                                                                  <th align="right"v bgcolor="#02acea"
                                                                      style="padding:6px 9px;color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">
                                                                      Tổng tạm</th>
                                                              </tr>
                                                          </thead>
                                                          <tbody bgcolor="#eee"
                                                              style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">
                                                              ${order_items.map(
                                                                (
                                                                  order,
                                                                  index
                                                                ) => `<tr>
                                                                <td align="left" style="padding:3px 9px"  key=${index} valign="top"><span>${
                                                                  order.product
                                                                    .name
                                                                }</span><br>
                                                                </td>
                                                                <td align="left" style="padding:3px 9px" valign="top">
                                                                    <span>${order.product.price.toLocaleString(
                                                                      'it-IT',
                                                                      {
                                                                        style:
                                                                          'currency',
                                                                        currency:
                                                                          'VND',
                                                                      }
                                                                    )}</span>
                                                                </td>
                                                                <td align="left" style="padding:3px 9px" valign="top">${
                                                                  order.quantity
                                                                }</td>
                                                                <td align="left" style="padding:3px 9px" valign="top">
                                                                    <span>${
                                                                      order
                                                                        .product
                                                                        .sale_percent
                                                                    }%</span>
                                                                </td>
                                                                <td align="right" style="padding:3px 9px" valign="top">
                                                                    <span>${(
                                                                      order.item_price *
                                                                      order.quantity
                                                                    ).toLocaleString(
                                                                      'it-IT',
                                                                      {
                                                                        style:
                                                                          'currency',
                                                                        currency:
                                                                          'VND',
                                                                      }
                                                                    )}</span>
                                                                </td>
                                                            </tr>`
                                                              )}
                                                          </tbody>
                                                          <tfoot
                                                              style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">
                                                              <tr>
                                                                  <td align="right" colspan="4" style="padding:5px 9px">Tạm tính</td>
                                                                  <td align="right" style="padding:5px 9px"><span>${order_items
                                                                    .reduce(
                                                                      (
                                                                        previous,
                                                                        current
                                                                      ) => {
                                                                        return (
                                                                          previous +
                                                                          current.item_price *
                                                                            current.quantity
                                                                        );
                                                                      },
                                                                      0
                                                                    )
                                                                    .toLocaleString(
                                                                      'it-IT',
                                                                      {
                                                                        style:
                                                                          'currency',
                                                                        currency:
                                                                          'VND',
                                                                      }
                                                                    )} </span></td>
                                                              </tr>
                                                              <tr>
                                                                  <td align="right" colspan="4" style="padding:5px 9px">Phí vận chuyển
                                                                  </td>
                                                                  <td align="right" style="padding:5px 9px"><span>${data.service_total.toLocaleString(
                                                                    'it-IT',
                                                                    {
                                                                      style:
                                                                        'currency',
                                                                      currency:
                                                                        'VND',
                                                                    }
                                                                  )}</span></td>
                                                              </tr>
                                                              <tr bgcolor="#eee">
                                                                  <td align="right" colspan="4" style="padding:7px 9px">
                                                                      <strong><big>Tổng
                                                                              giá trị đơn hàng</big> </strong></td>
                                                                  <td align="right" style="padding:7px 9px">
                                                                      <strong><big><span>${(
                                                                        order_items.reduce(
                                                                          (
                                                                            previous,
                                                                            current
                                                                          ) => {
                                                                            return (
                                                                              previous +
                                                                              current.item_price *
                                                                                current.quantity
                                                                            );
                                                                          },
                                                                          0
                                                                        ) +
                                                                        data.service_total
                                                                      ).toLocaleString(
                                                                        'it-IT',
                                                                        {
                                                                          style:
                                                                            'currency',
                                                                          currency:
                                                                            'VND',
                                                                        }
                                                                      )}</span> </big> </strong>
                                                                  </td>
                                                              </tr>
                                                          </tfoot>
                                                      </table>

                                                      <div style="margin:auto">

                                                      </div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>&nbsp;
                                                      <p
                                                          style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal;border:1px #14ade5 dashed;padding:5px;list-style-type:none">
                                                          Từ ngày 1/6/2022, TAKA-Shop sẽ không gửi tin nhắn SMS khi đơn hàng của bạn
                                                          được xác
                                                          nhận thành công. Chúng tôi chỉ liên hệ trong trường hợp đơn hàng có thể bị
                                                          trễ
                                                          hoặc không liên hệ giao hàng được.
                                                      </p>

                                                      <p
                                                          style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">
                                                          Mọi thắc mắc và góp ý, quý khách vui lòng liên hệ với chúng tôi qua SĐT
                                                          <span style="color: rgb(2, 172, 234);">0123456789</span>.
                                                          Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn.
                                                      </p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>&nbsp;
                                                      <p
                                                          style="font-family:Arial,Helvetica,sans-serif;font-size:12px;margin:0;padding:0;line-height:18px;color:#444;font-weight:bold">
                                                          Một lần nữa TAKA-Shop cảm ơn quý khách.
                                                      </p>
                                                      <p
                                                          style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;padding:4px;color:orange;font-style:italic;border:1px dashed #4daae0">
                                                          Đơn hàng được vận chuyển đến hoặc qua các khu vực đang bị ảnh hưởng bởi
                                                          Covid-19
                                                          sẽ có thể giao chậm hơn dự kiến. Kính mong quý khách thông cảm.
                                                      </p>
                                                      <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal;text-align:right">
                                                          <strong><a href="https://kltn-client-v1.vercel.app" style="color:#00a3dd;text-decoration:none;font-size:14px" target="_blank">TAKA-Shop</a>
                                                          </strong></p>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>

  </body>

  </html>

      `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Verfication email is sent to your gmail account');
    }
  });
};

const sendEMail = (to, url, username, txt) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"TAKA SHOP 👻" <anhtaibnvn12112001@gmail.com>',
    to: to,
    subject: 'TAKA SHOP',
    html: `<!DOCTYPE html>
      <html>
      
      <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <style type="text/css">
              @media screen {
                  @font-face {
                      font-family: 'Lato';
                      font-style: normal;
                      font-weight: 400;
                      src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                  }
      
                  @font-face {
                      font-family: 'Lato';
                      font-style: normal;
                      font-weight: 700;
                      src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                  }
      
                  @font-face {
                      font-family: 'Lato';
                      font-style: italic;
                      font-weight: 400;
                      src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                  }
      
                  @font-face {
                      font-family: 'Lato';
                      font-style: italic;
                      font-weight: 700;
                      src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                  }
              }
      
              /* CLIENT-SPECIFIC STYLES */
              body,
              table,
              td,
              a {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
              }
      
              table,
              td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }
      
              img {
                  -ms-interpolation-mode: bicubic;
              }
      
              /* RESET STYLES */
              img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
              }
      
              table {
                  border-collapse: collapse !important;
              }
      
              body {
                  height: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
              }
      
              /* iOS BLUE LINKS */
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
              }
      
              /* MOBILE STYLES */
              @media screen and (max-width:600px) {
                  h1 {
                      font-size: 32px !important;
                      line-height: 32px !important;
                  }
              }
      
              /* ANDROID CENTER FIX */
              div[style*="margin: 16px 0;"] {
                  margin: 0 !important;
              }
          </style>
      </head>
      
      <body style="background-color: #e1e1e1; margin: 0 !important; padding: 0 !important;">
          <!-- HIDDEN PREHEADER TEXT -->
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <!-- LOGO -->
              <tr>
                  <td bgcolor="#1746e0" align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#1746e0" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                  <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome ${username}!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#ffffff" align="left">
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                              <table border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td align="center" style="border-radius: 3px;" bgcolor="#1746e0"><a href=${url} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block;">${txt}</a></td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
     `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Verfication email is sent to your gmail account');
    }
  });
};
module.exports = {
  sendEmailCreateUser,
  sendMailOrderProducts,
  sendEMail,
};
