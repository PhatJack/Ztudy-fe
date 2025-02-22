import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Last updated: <strong>February 22, 2025</strong>
          </p>
          <Separator className="my-4" />

          <h2 className="text-lg font-semibold">1. Introduction</h2>
          <p className="text-gray-700 mt-2">
            By accessing this website, you agree to be bound by these Terms and
            Conditions.
          </p>

          <h2 className="text-lg font-semibold mt-6">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700 mt-2">
            You agree not to misuse the website and to comply with all
            applicable laws.
          </p>

          <h2 className="text-lg font-semibold mt-6">
            3. Intellectual Property
          </h2>
          <p className="text-gray-700 mt-2">
            All content on this site is our property and may not be reproduced
            without permission.
          </p>

          <h2 className="text-lg font-semibold mt-6">4. Changes to Terms</h2>
          <p className="text-gray-700 mt-2">
            We reserve the right to modify these terms at any time. Continued
            use of our services constitutes acceptance of the new terms.
          </p>

          <h2 className="text-lg font-semibold mt-6">5. Contact Us</h2>
          <p className="text-gray-700 mt-2">
            If you have any questions, reach out to us at{" "}
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

export default TermsAndConditionsPage;
