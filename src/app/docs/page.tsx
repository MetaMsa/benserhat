import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swagger",
  alternates: {
    canonical: "https://benserhat.com/docs"
  }
};


export default function Docs() {
  return <SwaggerUI url="/api/docs"/>;
}