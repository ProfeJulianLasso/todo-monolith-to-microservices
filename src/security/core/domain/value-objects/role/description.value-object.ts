import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'description';

export class DescriptionValueObject extends ValueObjectAbstract<string> {
  private schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  validateData(): void {
    if (!this.schema)
      this.schema = Joi.object({
        value: Joi.string()
          .optional()
          .max(1024)
          .messages({
            'string.base': `El ${FIELD_NAME} del rol debe ser de tipo texto`,
            'string.empty': `El ${FIELD_NAME} del rol no puede estar vacío`,
            'string.max': `El ${FIELD_NAME} de la tarea debe tener una longitud máxima de {#limit}`,
          }),
      });
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
