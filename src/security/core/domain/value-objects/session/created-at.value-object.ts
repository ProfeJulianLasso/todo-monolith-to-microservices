import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'createdAt';

export class CreatedAtValueObject extends ValueObjectAbstract<Date> {
  private readonly schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor(value?: Date) {
    super(value);
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
  }

  validateData(): void {
    if (this.schema) {
      const { error } = this.schema.validate({ value: this._value });
      if (error) this.setError({ field: FIELD_NAME, message: error.message });
    }
  }
}
