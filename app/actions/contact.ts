"use server";

interface ContactFormState {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    // Send email via Resend, Mailgun, or similar service
    // For now, log and return success — replace with actual email service
    console.log("Contact form submission:", {
      name,
      email,
      company: formData.get("company"),
      intent: formData.get("intent"),
      message,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
