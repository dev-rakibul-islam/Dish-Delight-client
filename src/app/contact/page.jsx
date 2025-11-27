import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FormGroup } from "@/components/forms/FormGroup";
import { TextField, TextAreaField } from "@/components/forms/input";

const touchpoints = [
  {
    title: "Email us",
    detail: "hello@dishdelight.com",
    hours: "We reply in a few hours",
  },
  {
    title: "Need help?",
    detail: "support@dishdelight.com",
    hours: "Live chat available",
  },
  {
    title: "Have questions?",
    detail: "FAQ at dishdelight.com",
    hours: "Answers usually there",
  },
];

export const metadata = {
  title: "Contact | Dish Delight",
};

export default function ContactPage() {
  return (
    <div className="space-y-16 py-10">
      <section>
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Contact"
            title="Questions? We're here to help"
            description="Have a question about how Dish Delight works? Want to suggest a feature? Just want to say hello? Get in touch."
          />
          <div className="grid gap-8 lg:grid-cols-3">
            <form className="lg:col-span-2 space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <FormGroup label="Full name">
                <TextField name="name" placeholder="John Smith" required />
              </FormGroup>
              <div className="grid gap-6 md:grid-cols-2">
                <FormGroup label="Email">
                  <TextField
                    name="email"
                    type="email"
                    placeholder="john@yourrestaurant.com"
                    required
                  />
                </FormGroup>
                <FormGroup label="Phone" hint="Optional">
                  <TextField name="phone" placeholder="+1 (555) 123-4567" />
                </FormGroup>
              </div>
              <FormGroup label="Message">
                <TextAreaField
                  name="message"
                  placeholder="Tell us what you think or what you need."
                  rows={5}
                  required
                />
              </FormGroup>
              <Button type="submit" className="w-full md:w-auto">
                Send message
              </Button>
            </form>
            <div className="space-y-5">
              {touchpoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
                    {point.title}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {point.detail}
                  </p>
                  <p className="text-sm text-slate-500">{point.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
