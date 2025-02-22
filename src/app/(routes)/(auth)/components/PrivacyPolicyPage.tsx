import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Last updated: <strong>February 22, 2025</strong>
          </p>
          <Separator className="my-4" />

          <h2 className="text-lg font-semibold">1. Introduction</h2>
          <p className="text-gray-700 mt-2">
            We value your privacy and are committed to protecting your personal
            data.
          </p>

          <h2 className="text-lg font-semibold mt-6">
            2. Information We Collect
          </h2>
          <p className="text-gray-700 mt-2">
            We collect data that you provide to us, such as your name, email
            address, and usage details.
          </p>

          <h2 className="text-lg font-semibold mt-6">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 mt-2">
            We use your data to improve our services, provide support, and
            ensure security.
          </p>

          <h2 className="text-lg font-semibold mt-6">4. Contact Us</h2>
          <p className="text-gray-700 mt-2">
            If you have any questions, feel free to contact us at{" "}
            <a
              href="mailto:tienphat.ng693@gmail.com"
              className="text-primary underline"
            >
              <strong>tienphat.ng693@example.com</strong>
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
