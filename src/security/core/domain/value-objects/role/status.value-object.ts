import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'email';

export class StatusValueObject extends ValueObjectAbstract<boolean> {
  private readonly schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor(value?: boolean) {
    super(value);
    this.schema = Joi.object({
      value: Joi.boolean()
        .required()
        .sensitive()
        .messages({
          'boolean.base': `El ${FIELD_NAME} del rol debe ser de tipo booleano`,
          'any.required': `El ${FIELD_NAME} del rol es requerido`,
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
