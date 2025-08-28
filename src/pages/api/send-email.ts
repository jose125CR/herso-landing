import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

const hersoCommonTemplate = (fields: Object) => {
  const list = Object.entries(fields)
    .map(([key, value]) => {
      return (
        `<li> 
          <b>
            ${key}: 
          </b>
          ${value}
        </li>`
      );
    });

  return `<ul>${list.join('')}</ul>`;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const json = await request.json();
    const template = hersoCommonTemplate(json);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: import.meta.env.HERSO_SENDER_EMAIL,
        pass: import.meta.env.HERSO_SENDER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: import.meta.env.HERSO_SENDER_EMAIL,
      to: import.meta.env.HERSO_TO_EMAIL,
      subject: `Contacto HERSO page`,
      html: template
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
};