import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ccfc2de0f4efb7",
        pass: "8ed5a119d97646"
    }
});

app.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot } = req.body;
    console.log(req.body);
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }

    });
    
    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Alan Brilhante <alan.unicasiscon@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111; >`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${type}</p>`,
            `</div>`
        ].join('\n')
    });

    return res.status(201).json({ data: feedback});
    // return res.send('Hello World');
});

app.listen(3333, () => {
    console.log('Http server runnig!')
});