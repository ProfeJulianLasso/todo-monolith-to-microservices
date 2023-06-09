import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'expiresAt';
const MAX_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days

export class ExpiresAtValueObject extends ValueObjectAbstract<Date> {
  private schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor() {
    const value = new Date(Date.now() + MAX_EXPIRATION_TIME);
    super(value);
  }

  validateData(): void {
    if (!this.schema)
      this.schema = Joi.object({
        value: Joi.date()
          .required()
          .timestamp()
          .messages({
            'date.base': `The field ${FIELD_NAME} must be a valid date`,
            'date.empty': `The field ${FIELD_NAME} cannot be empty`,
            'date.timestamp': `The field ${FIELD_NAME} must be a valid timestamp`,
            'any.required': `The field ${FIELD_NAME} is required`,
          }),
      });
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
