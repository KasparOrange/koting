const input =
`- Antihypertensives (lower blood pressure)
- Antipyretics (reduce fever)
- Antiemetics (prevent/reduce nausea and vomiting)
- Anticonvulsants (prevent seizures)
- Antibiotics (treat bacterial infections)
- Antivirals (treat viral infections)
- Antihistamines (block histamine receptors)
- Diuretics (increase urine production)
- Hypnotics (induce sleep)
- Bronchodilators (open airways)
- Immunosuppressants (suppress immune response)
- Statins (lower cholesterol)`;

const result = input.split("\n").map(item => item
    .slice(2)
    // remove text in parentheses with code from Claude that I don't understand
    // .replace(/\s*\([^)]*\)/g, '')
);

result.forEach(item => console.log(item));