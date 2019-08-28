let commonTemplate = (title, subtitle, message, url, buttonName) => {
    if (buttonName && url) {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>DeveloperFox - Account Verification</title>


	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css?family=Lora:400,700" rel="stylesheet" />
	<style type="text/css">


		@-ms-viewport{width:device-width;}
		table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}
		img{-ms-interpolation-mode:bicubic; border: 0;}
		p, a, li, td, blockquote{mso-line-height-rule:exactly;}
		p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;}
		#outlook a{padding:0;}
		.ReadMsgBody{width:100%;} .ExternalClass{width:100%;}
		.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img{line-height:100%;}


		*{-webkit-text-size-adjust:none;-webkit-text-resize:100%;text-resize:100%;}
		table{border-spacing: 0 !important;}
		h1, h2, h3, h4, h5, h6, p{display:block; Margin:0; padding:0;}
		img, a img{border:0; height:auto; outline:none; text-decoration:none;}
		#bodyTable, #bodyCell{ margin:0; padding:0; width:100%;}
		body {height:100%; margin:0; padding:0; width:100%;}

		.appleLinks a {color: #c2c2c2 !important; text-decoration: none;}
        span.preheader { display: none !important; }


		[style*="Open Sans"] {font-family:'Open Sans', Helvetica, Arial, sans-serif !important;}
		[style*="Lora"] {font-family:'Lora', Georgia, Times, serif !important;}


		.wrapperWebview, .wrapperBody, .wrapperFooter{width:100%; max-width:600px; Margin:0 auto;}


		.tableCard {text-align:center; font-size:0;}


		.imgHero img{ width:600px; height:auto; }

	</style>

	<style type="text/css">

		@media screen and (max-width:640px) {
			table[class="wrapperWebview"]{width:100% !important; }
			table[class="wrapperEmailBody"]{width:100% !important; }
			table[class="wrapperFooter"]{width:100% !important; }
			td[class="imgHero"] img{ width:100% !important;}
			.hideOnMobile {display:none !important; width:0; overflow:hidden;}
		}
	</style>

</head>

<body style="background-color:#F9F9F9;">
<center>
		<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#F9F9F9;" id="bodyTable">
	<tbody><tr>
		<td align="center" valign="top" style="padding-right:10px;padding-left:10px;" id="bodyCell">
		<!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" style="width:600px;" width="600"><tr><td align="center" valign="top"><![endif]-->


		<table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperWebview">
			<tbody><tr>
				<td align="center" valign="top">

					<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tbody><tr>
							<td align="right" valign="middle" style="padding-top: 20px; padding-right: 0px;" class="webview">

								<a class="text hideOnMobile" href="" target="_blank" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:right; text-decoration:underline; padding:0; margin:0"></a>
							</td>
						</tr>
					</tbody></table>

				</td>
			</tr>
		</tbody></table>



		<table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperWebview">
			<tbody><tr>
				<td align="center" valign="top">

					<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tbody><tr>
							<td align="center" valign="middle" style="padding-top: 40px; padding-bottom: 40px;" class="emailLogo">
							</td>
						</tr>
					</tbody></table>

				</td>
			</tr>
		</tbody></table>



		<table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperBody">
			<tbody><tr>
				<td align="center" valign="top">


					<table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-color:#E5E5E5; border-style:solid; border-width:0 1px 1px 1px;" width="100%" class="tableCard">

						<tbody><tr>

							<td height="3" style="background-color:#003CE5;font-size:1px;line-height:3px;" class="topBorder">&nbsp;</td>
						</tr>


						<tr>
							<td align="center" valign="top" style="padding-bottom: 20px;" class="imgHero">

								<a href="#" target="_blank" style="text-decoration:none;">
									<img src="http://grapestheme.com/notify/img/hero-img/blue/heroFill/user-account.png" width="600" alt="" border="0" style="width:100%; max-width:600px; height:auto; display:block;">
								</a>
							</td>
						</tr>

						<tr>
							<td align="center" valign="top" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" class="mainTitle">

								<h2 class="text" style="color:#000000; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:28px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:36px; text-transform:none; text-align:center; padding:0; margin:0">
									${title}
								</h2>
							</td>
						</tr>

						<tr>
							<td align="center" valign="top" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" class="subTitle">

								<h4 class="text" style="color:#999999; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:16px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:24px; text-transform:none; text-align:center; padding:0; margin:0">
                                    ${subtitle}
								</h4>
							</td>
						</tr>

						<tr>
							<td align="center" valign="top" style="padding-left:20px;padding-right:20px;" class="containtTable ui-sortable">

								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
									<tbody><tr>
										<td align="center" valign="top" style="padding-bottom: 20px;" class="description">

											<p class="text" style="color:#666666; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:14px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:22px; text-transform:none; text-align:center; padding:0; margin:0">
                                                ${message}
											</p>
										</td>
									</tr>
								</tbody></table>

								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
									<tbody><tr>
										<td align="center" valign="top" style="padding-top:20px;padding-bottom:20px;">


											<table align="center" border="0" cellpadding="0" cellspacing="0">
												<tbody><tr>
													<td align="center" class="ctaButton" style="background-color: rgb(0, 60, 229); padding: 12px 35px; border-radius: 50px;">

														<a class="text" href="${url}" target="_blank" style="color:#FFFFFF; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:13px; font-weight:600; font-style:normal;letter-spacing:1px; line-height:20px; text-transform:uppercase; text-decoration:none; display:block">
															${buttonName}
														</a>
													</td>
												</tr>
											</tbody></table>

										</td>
									</tr>
								</tbody></table>

							</td>
						</tr>

						<tr>
							<td height="20" style="font-size:1px;line-height:1px;">&nbsp;</td>
						</tr>

						<tr><td align="center" valign="middle" style="padding-bottom: 40px;" class="emailRegards">
                    </td>
</tr>
					</tbody></table>



					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
						<tbody><tr>
							<td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
						</tr>
					</tbody></table>

				</td>
			</tr>
		</tbody></table>



		<table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperFooter">
			<tbody><tr>
				<td align="center" valign="top">

					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
						<tbody><tr>
							<td align="center" valign="top" style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;" class="socialLinks">










							</td>
						</tr>

						<tr>
							<td align="center" valign="top" style="padding: 10px 10px 5px;" class="brandInfo">

								<p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">©&nbsp;DeveloperFox. | HiTech City, Hyderabad, Telangana, INDIA.
								</p>
							</td>
						</tr>

						<tr>
							<td align="center" valign="top" style="padding: 0px 10px 20px;" class="footerLinks">

								<p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;"></p>
							</td>
						</tr>

						<tr>
							<td align="center" valign="top" style="padding: 0px 10px 10px;" class="footerEmailInfo">

								<p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">
								If you have any quetions please contact us <a href="#" style="color:#777777;text-decoration:underline;" target="_blank">hello@developerfox.com.</a>
								</p>
							</td>
						</tr>

						<tr>
							<td align="center" valign="top" style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;" class="appLinks">

							</td>
						</tr>


						<tr>
							<td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
						</tr>
					</tbody></table>

				</td>
			</tr>


			<tr>
				<td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
			</tr>
		</tbody></table>


		<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
		</td>
	</tr>
</tbody></table>
	</center>
</body>
</html>`
    } else {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>DeveloperFox - Account Verification</title>


            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Lora:400,700" rel="stylesheet" />
            <style type="text/css">


                @-ms-viewport{width:device-width;}
                table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}
                img{-ms-interpolation-mode:bicubic; border: 0;}
                p, a, li, td, blockquote{mso-line-height-rule:exactly;}
                p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;}
                #outlook a{padding:0;}
                .ReadMsgBody{width:100%;} .ExternalClass{width:100%;}
                .ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img{line-height:100%;}


                *{-webkit-text-size-adjust:none;-webkit-text-resize:100%;text-resize:100%;}
                table{border-spacing: 0 !important;}
                h1, h2, h3, h4, h5, h6, p{display:block; Margin:0; padding:0;}
                img, a img{border:0; height:auto; outline:none; text-decoration:none;}
                #bodyTable, #bodyCell{ margin:0; padding:0; width:100%;}
                body {height:100%; margin:0; padding:0; width:100%;}

                .appleLinks a {color: #c2c2c2 !important; text-decoration: none;}
                span.preheader { display: none !important; }


                [style*="Open Sans"] {font-family:'Open Sans', Helvetica, Arial, sans-serif !important;}
                [style*="Lora"] {font-family:'Lora', Georgia, Times, serif !important;}


                .wrapperWebview, .wrapperBody, .wrapperFooter{width:100%; max-width:600px; Margin:0 auto;}


                .tableCard {text-align:center; font-size:0;}


                .imgHero img{ width:600px; height:auto; }

            </style>

            <style type="text/css">

                @media screen and (max-width:640px) {
                    table[class="wrapperWebview"]{width:100% !important; }
                    table[class="wrapperEmailBody"]{width:100% !important; }
                    table[class="wrapperFooter"]{width:100% !important; }
                    td[class="imgHero"] img{ width:100% !important;}
                    .hideOnMobile {display:none !important; width:0; overflow:hidden;}
                }
            </style>

        </head>

        <body style="background-color:#F9F9F9;">
        <center>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#F9F9F9;" id="bodyTable">
            <tbody><tr>
                <td align="center" valign="top" style="padding-right:10px;padding-left:10px;" id="bodyCell">
                <!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" style="width:600px;" width="600"><tr><td align="center" valign="top"><![endif]-->


                <table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperWebview">
                    <tbody><tr>
                        <td align="center" valign="top">

                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tbody><tr>
                                    <td align="right" valign="middle" style="padding-top: 20px; padding-right: 0px;" class="webview">

                                        <a class="text hideOnMobile" href="" target="_blank" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:right; text-decoration:underline; padding:0; margin:0"></a>
                                    </td>
                                </tr>
                            </tbody></table>

                        </td>
                    </tr>
                </tbody></table>



                <table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperWebview">
                    <tbody><tr>
                        <td align="center" valign="top">

                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tbody><tr>
                                    <td align="center" valign="middle" style="padding-top: 40px; padding-bottom: 40px;" class="emailLogo">
                                    </td>
                                </tr>
                            </tbody></table>

                        </td>
                    </tr>
                </tbody></table>



                <table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperBody">
                    <tbody><tr>
                        <td align="center" valign="top">


                            <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-color:#E5E5E5; border-style:solid; border-width:0 1px 1px 1px;" width="100%" class="tableCard">

                                <tbody><tr>

                                    <td height="3" style="background-color:#003CE5;font-size:1px;line-height:3px;" class="topBorder">&nbsp;</td>
                                </tr>


                                <tr>
                                    <td align="center" valign="top" style="padding-bottom: 20px;" class="imgHero">

                                        <a href="#" target="_blank" style="text-decoration:none;">
                                            <img src="http://grapestheme.com/notify/img/hero-img/blue/heroFill/user-account.png" width="600" alt="" border="0" style="width:100%; max-width:600px; height:auto; display:block;">
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" valign="top" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" class="mainTitle">

                                        <h2 class="text" style="color:#000000; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:28px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:36px; text-transform:none; text-align:center; padding:0; margin:0">
                                            ${title}
                                        </h2>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" valign="top" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" class="subTitle">

                                        <h4 class="text" style="color:#999999; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:16px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:24px; text-transform:none; text-align:center; padding:0; margin:0">
                                            ${subtitle}
                                        </h4>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" valign="top" style="padding-left:20px;padding-right:20px;" class="containtTable ui-sortable">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                            <tbody><tr>
                                                <td align="center" valign="top" style="padding-bottom: 20px;" class="description">

                                                    <p class="text" style="color:#666666; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:14px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:22px; text-transform:none; text-align:center; padding:0; margin:0">
                                                        ${message}
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody></table>

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                                            <tbody><tr>
                                                <td align="center" valign="top" style="padding-top:20px;padding-bottom:20px;">


                                                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                                                        <tbody><tr>
                                                        </tr>
                                                    </tbody></table>

                                                </td>
                                            </tr>
                                        </tbody></table>

                                    </td>
                                </tr>

                                <tr>
                                    <td height="20" style="font-size:1px;line-height:1px;">&nbsp;</td>
                                </tr>

                                <tr><td align="center" valign="middle" style="padding-bottom: 40px;" class="emailRegards">
                            </td>
        </tr>
                            </tbody></table>



                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                <tbody><tr>
                                    <td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
                                </tr>
                            </tbody></table>

                        </td>
                    </tr>
                </tbody></table>



                <table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%" class="wrapperFooter">
                    <tbody><tr>
                        <td align="center" valign="top">

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                <tbody><tr>
                                    <td align="center" valign="top" style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;" class="socialLinks">










                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" valign="top" style="padding: 10px 10px 5px;" class="brandInfo">

                                        <p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">©&nbsp;DeveloperFox. | HiTech City, Hyderabad, Telangana, INDIA.
                                        </p>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" valign="top" style="padding: 0px 10px 20px;" class="footerLinks">

                                        <p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;"></p>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" valign="top" style="padding: 0px 10px 10px;" class="footerEmailInfo">

                                        <p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">
                                        If you have any quetions please contact us <a href="#" style="color:#777777;text-decoration:underline;" target="_blank">hello@developerfox.com.</a>
                                        </p>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" valign="top" style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;" class="appLinks">

                                    </td>
                                </tr>


                                <tr>
                                    <td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
                                </tr>
                            </tbody></table>

                        </td>
                    </tr>


                    <tr>
                        <td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
                    </tr>
                </tbody></table>


                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody></table>
            </center>
        </body>
        </html>`
    }
}

module.exports.commonTemplate = commonTemplate;
