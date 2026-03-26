export function sendEmail(to, subject, content) {
  // In a real application, this would integrate with an email service
  console.log(`Sending email to ${to}:`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${content}`);
}

export function replaceTemplateVariables(template, variables) {
  return Object.entries(variables).reduce(
    (content, [key, value]) => content.replace(`[${key}]`, value),
    template
  );
}