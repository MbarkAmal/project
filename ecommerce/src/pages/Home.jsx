import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  window.watsonAssistantChatOptions = {
    integrationID: "3b844e54-df81-4ab4-b18c-0283265f02fb", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "126300c4-2fee-4120-a7d0-9c4a4ffc6ab0", // The ID of your service instance.
    onLoad: async (instance) => {
      await instance.render();
    },
  };
  setTimeout(function () {
    const t = document.createElement("script");
    t.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
      (window.watsonAssistantChatOptions.clientVersion || "latest") +
      "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
