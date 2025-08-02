export class AddStepBasicRequest {
    description: string;
    position: number;
    title?: string;
    picture?: string;
    tip?: {
        text: string;
        severity: string;
    }

    constructor(description: string, position: number, title: string, picture: string, tip: {
        text: string;
        severity: string
    }) {
        this.description = description;
        this.position = position;
        this.title = title;
        this.picture = picture;
        this.tip = tip;
    }
}