import { faker } from '@faker-js/faker';

export class FakerData {

    static randomEmail(): string {
        return faker.internet.email();
    }

    static randomUsername(): string {
        return faker.internet.username();
    }
}