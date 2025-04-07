import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageProvider } from "./LanguageProvider";
import { LanguageContext } from "./LanguageContext";

describe("LanguageProvider", () => {
    it("should provide the default language as 'en'", () => {
        render(
            <LanguageProvider>
                <LanguageContext.Consumer>
                    {({ language }) => <span>Current Language: {language}</span>}
                </LanguageContext.Consumer>
            </LanguageProvider>
        );

        expect(screen.getByText("Current Language: en")).toBeInTheDocument();
    });

    it("should update the language when setLanguage is called", async () => {
        render(
            <LanguageProvider>
                <LanguageContext.Consumer>
                    {({ language, setLanguage }) => (
                        <>
                            <span>Current Language: {language}</span>
                            <button onClick={() => setLanguage("ru")}>Change Language</button>
                        </>
                    )}
                </LanguageContext.Consumer>
            </LanguageProvider>
        );

        // Verify default language
        expect(screen.getByText("Current Language: en")).toBeInTheDocument();

        // Simulate changing the language
        fireEvent.click(screen.getByText("Change Language"));

        // Wait for the language to update
        await waitFor(() => {
            expect(screen.getByText("Current Language: ru")).toBeInTheDocument();
        });
    });
});