import { FeedbacksRepository } from "../repositories/feedbacks-repository";


interface SubmitFeedbacksUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbacksUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
    ){}

    async execute(request: SubmitFeedbacksUseCaseRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })
    }
}