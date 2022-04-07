import smtplib
from email.message import EmailMessage
import config
from email.header import Header
from email.utils import formataddr


def sendMail(subject, body, toMail):
    msg = EmailMessage()
    s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    s.login(config.mailID, config.mailPass)
    message = body
    msg.set_content(message)
    msg['Subject'] = subject
    msg['From'] = formataddr((str(Header('Bizverse, IIC TMSL', 'utf-8')), 'bizverse2k22@gmail.com'))
    msg['To'] = toMail
    s.send_message(msg)
    s.quit()
