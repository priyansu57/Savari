const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    secure:true,
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:"s8286388@gmail.com",
        pass:"brqc wdxu benj gutt",
    }
});

function getOtp() {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10); // append digit
  }
  return otp;
}

const otp = getOtp();

function sendMail ({email}) {
  console.log("email in otp service" , email);
  
    transporter.sendMail({
        to: email || "s8286388@gmail.com",
        from: "s8286388@gmail.com",
        subject: "Otp for Ride",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              
              <!-- Header -->
              <div style="background: #111827; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 22px; margin: 0;">Savari</h1>
                <p style="color: #d1d5db; font-size: 14px; margin: 4px 0 0;">Your Ride Verification Code</p>
              </div>

              <!-- Body -->
              <div style="padding: 28px; text-align: center;">
                <p style="font-size: 16px; color: #334155; margin: 0 0 18px;">
                  To confirm and start your ride, please use the following One Time Password:
                </p>

                <!-- OTP -->
                <p style="font-size: 32px; font-weight: bold; color: #111827; background: #f9fafb; border: 1px dashed #2563eb; display: inline-block; padding: 14px 32px; border-radius: 10px; letter-spacing: 5px; margin: 0 0 22px;">
                 ${otp}
                </p>

                <p style="color: #64748b; font-size: 14px; margin: 0 0 10px;">
                  This code will expire in <b>5 minutes</b>.
                </p>
                <p style="color: #ef4444; font-size: 13px; margin: 0;">
                  ⚠️ Do not share this OTP with anyone.
                </p>
              </div>

              <!-- Footer -->
              <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
                Need help? Contact <a href="mailto:support@savari.com" style="color: #2563eb; text-decoration: none;">Savari Support</a> <br />
                © ${new Date().getFullYear()} Savari. All rights reserved.
              </div>
            </div>
          `
    });
};

module.exports = {sendMail , otp}

