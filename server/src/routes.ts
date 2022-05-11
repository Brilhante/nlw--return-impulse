import express from 'express';
import nodemailer from 'nodemailer'
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbacksUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ccfc2de0f4efb7",
        pass: "8ed5a119d97646"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot } = req.body;
    // console.log(req.body);
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbacksUseCase(prismaFeedbacksRepository)

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })
    
    // await transport.sendMail({
    //     from: 'Equipe Feedget <oi@feedget.com>',
    //     to: 'Alan Brilhante <alan.unicasiscon@gmail.com>',
    //     subject: 'Novo feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111; >`,
    //         `<p>Tipo do feedback: ${type}</p>`,
    //         `<p>Comentário: ${type}</p>`,
    //         `</div>`
    //     ].join('\n')
    // });

    return res.status(201).send();
    // return res.send('Hello World');
});