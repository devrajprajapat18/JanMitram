import { renderHook } from "@testing-library/react";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/useAuth";

describe("AuthProvider", () => {
  it("starts unauthenticated when no token is present", () => {
    localStorage.clear();
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
