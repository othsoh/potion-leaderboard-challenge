"use client";

import { Alert } from "@heroui/alert";
import { useState } from "react";

export function HeaderAlerts() {
  const [showXAlert, setShowXAlert] = useState(true);
  const [showFeatureAlert, setShowFeatureAlert] = useState(true);
  const title = "This is an alert";
  const description = "Thanks for subscribing to our newsletter!";
  return (
    <div className="flex absolute top-0 right-0 mx-auto  w-full">
      <Alert description={description} title={title} />
    </div>
  );
}

