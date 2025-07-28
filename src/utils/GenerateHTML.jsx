// src/utils/generateHTML.js

export function generateHTMLWithCSS(sections) {
  const style = `
    <style>
      form {
        max-width: 800px;
        margin: auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-family: Arial, sans-serif;
      }
      fieldset {
        margin-bottom: 2rem;
        border: 1px solid #ddd;
        padding: 1rem;
        border-radius: 5px;
      }
      legend {
        font-weight: bold;
        padding: 0 10px;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 1rem;
      }
      .column {
        flex: 1;
        min-width: 200px;
      }
      .column label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.3rem;
      }
      .column input, .column textarea, .column select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    </style>
  `;

  const getFieldHTML = (field) => {
    const { config, db_column_name } = field;
    const { label, field_type, placeholder, required } = config;

    const requiredAttr = required ? 'required' : '';

    switch (field_type) {
      case 'textarea':
        return `
          <label>${label}</label>
          <textarea name="${db_column_name}" placeholder="${placeholder}" ${requiredAttr}></textarea>
        `;
      case 'number':
      case 'date':
      case 'time':
      case 'email':
      case 'text':
      default:
        return `
          <label>${label}</label>
          <input type="${field_type}" name="${db_column_name}" placeholder="${placeholder}" ${requiredAttr} />
        `;
    }
  };

  const body = sections
    .map(
      (section) => `
    <fieldset>
      <legend>${section.section_name}</legend>
      ${section.rows
        .map(
          (row) => `
        <div class="row">
          ${row.columns
            .map(
              (col) => `
            <div class="column">
              ${col.fields.map(getFieldHTML).join('')}
            </div>
          `
            )
            .join('')}
        </div>
      `
        )
        .join('')}
    </fieldset>
  `
    )
    .join('');

  const fullHTML = `<form>${style}${body}</form>`;
  return fullHTML;
}
