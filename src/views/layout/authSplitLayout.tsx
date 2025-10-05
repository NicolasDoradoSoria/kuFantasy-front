import { useLocation } from "react-router";
import AuthSplitLayoutForm from "../components/authSplitLayout";

interface PublicAuthLayoutProps {
  children: React.ReactNode;
  titleOverride?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const titles: Record<string, string> = {
  "/login": "Iniciar sesión",
  "/userSelect": "Crear cuenta",
  "/passwordRestore": "Recuperar contraseña",
};

const AuthSplitLayout = ({
  children,
  titleOverride,
  imageSrc = "/login-2.jpeg",
  imageAlt = "Imagen de fondo",
}: PublicAuthLayoutProps) => {
  const location = useLocation();
  const actionTitle = titleOverride ?? titles[location.pathname] ?? "";

  const pagesWithHeader = ["/user/characterSelect"];
  const topOffsetClass = pagesWithHeader.includes(location.pathname) ? "mt-[70px]" : "";

  return (
    <section className="flex bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <AuthSplitLayoutForm actionTitle={actionTitle} topOffsetClass={topOffsetClass}>
        {children}
      </AuthSplitLayoutForm>

      <article className="hidden md:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30 z-10 pointer-events-none"></div>
        <img src={imageSrc} alt={imageAlt} className="w-full" />
      </article>
    </section>
  );
};

export default AuthSplitLayout;
