import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { AuthContext } from "./AuthContext";
import api from "../utils/api";

// Mock the API module
jest.mock("../utils/api");

describe("AuthProvider", () => {
    // Suppress console.error during tests
    beforeAll(() => {
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterAll(() => {
        console.error.mockRestore();
    });
    it("should provide the default authentication status as false", () => {
        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {({ isAuthenticated }) => (
                        <span>Authenticated: {isAuthenticated.toString()}</span>
                    )}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        // Verify the default authentication status
        expect(screen.getByText("Authenticated: false")).toBeInTheDocument();
    });

    it("should update authentication status based on API response", async () => {
        // Mock the API response for authentication status
        api.get.mockResolvedValueOnce({ data: { isAuthenticated: true } });

        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {({ isAuthenticated }) => (
                        <span>Authenticated: {isAuthenticated.toString()}</span>
                    )}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        // Wait for the authentication status to update
        await waitFor(() => {
            expect(screen.getByText("Authenticated: true")).toBeInTheDocument();
        });
    });

    it("should handle API errors and set authentication status to false", async () => {
        // Mock the API to throw an error
        api.get.mockRejectedValueOnce(new Error("Network Error"));

        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {({ isAuthenticated }) => (
                        <span>Authenticated: {isAuthenticated.toString()}</span>
                    )}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        // Wait for the authentication status to update
        await waitFor(() => {
            expect(screen.getByText("Authenticated: false")).toBeInTheDocument();
        });
    });
});