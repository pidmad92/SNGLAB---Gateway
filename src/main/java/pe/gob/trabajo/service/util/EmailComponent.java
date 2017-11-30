package pe.gob.trabajo.service.util;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

public class EmailComponent {

    @Value("${mail.user}")
    private String userFrom;
    @Value("${mail.password}")
    private String password;
    @Value("${mail.desde}")
    private String desde;
    
    public  void sendEmail(String para, String subject, String body) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        Session getMailSession = Session.getInstance(props, null);
        MimeMessage generateMailMessage = new MimeMessage(getMailSession);

        generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(para));
        generateMailMessage.setSubject(subject);
        generateMailMessage.setFrom(new InternetAddress(desde));

        //generateMailMessage.setContent(body, "text/html; charset=UTF-8");
        generateMailMessage.setText(body, "utf-8", "html");

        System.out.println("Enviando correo para " + para +  " desde " + userFrom);
        Transport transport = getMailSession.getTransport("smtp");
        transport.connect("smtp.gmail.com", userFrom, password);
        transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
        transport.close();
    }

}