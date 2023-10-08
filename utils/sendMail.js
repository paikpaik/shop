const nodemailer = require("nodemailer");
const mjml2html = require("mjml");
const config = require("../config");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.mailer.mailerId,
    pass: config.mailer.mailerPwd,
  },
});

const sendMail = (to, subject, text) => {
  let contentMessage = "";
  if (subject === "shop 인증코드입니다.") {
    contentMessage = "shop 인증코드입니다. 인증을 완료해 주세요.";
  } else if (subject === "service1") {
    contentMessage = "service1";
  } else {
    [(contentMessage = "service2")];
  }
  const { html } = mjml2html(
    `
    <mjml>
  <mj-head>
    <mj-font
      name="Pretendard"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
    />

    <mj-attributes>
      <mj-all font-family="Pretendard, Arial" color="#404040" />
    </mj-attributes>

    <mj-style>

      
       * { word-break: keep-all; text-align: center; margin: 0 auto;} a { color: #2563eb !important; text-decoration: none;}
      div {text-align: center !important;}
    </mj-style>
  </mj-head>
 <mj-body>
    <mj-section 
   >
      <mj-column   margin= "0 auto"
    width="100%"
    padding=" 30px 0"
    border= "10px solid #9ed292"
    border-radius= "30px" 
 >


        <!-- Header -->
        <mj-image width="150px"  ></mj-image>
        

        <!-- Main -->

        <mj-text  display="block"  font-size="20px" line-height="1.5">
          임시비밀번호 
        </mj-text>


        <mj-text  display="block" width="100%" padding="100px" font-size="32px" font-weight="700" line-height="1.5" text-align= "center">${text}</mj-text>

        <mj-text font-size="16px" line-height="1.5"> shop</mj-text>

        <!-- Footer -->
        <mj-divider border-color="#E5E7EB" border-width="1px"></mj-divider>

        <mj-text align="center" font-size="12px" line-height="1.75">
          <a
            href="http://34.64.216.86"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >웹사이트 이동하기</a
          >
        </mj-text>

        <mj-text
          align="center"
          font-family="Pretendard, Arial"
          font-size="12px"
          line-height="1"
        >
          © shop. All Rights Reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `
  );

  return new Promise((resolve, reject) => {
    const message = {
      from: config.mailer.mailerId,
      to,
      subject,
      text,
      html: html,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info);
    });
  });
};

module.exports = { sendMail };
