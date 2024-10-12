import { faker } from "@faker-js/faker"

const generatePhrase = (): string => {
    return faker.company.catchPhrase().toLowerCase()
}

export default generatePhrase