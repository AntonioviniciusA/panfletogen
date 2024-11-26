import React from "react";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3 class="footer-title">Entre em contato</h3>
          <p class="footer-text">📍 Rua Exemplo, 123 - Centro</p>
          <p class="footer-text">📞 (11) 98765-4321</p>
          <p class="footer-text">📧 contato@exemplo.com</p>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Links rápidos</h3>
          <ul class="footer-links">
            <li>
              <a href="/sobre" class="footer-link">
                Sobre nós
              </a>
            </li>
            <li>
              <a href="/servicos" class="footer-link">
                Serviços
              </a>
            </li>
            <li>
              <a href="/contato" class="footer-link">
                Fale conosco
              </a>
            </li>
            <li>
              <a href="/politica" class="footer-link">
                Política de privacidade
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Siga-nos</h3>
          <div class="footer-social">
            <a href="https://facebook.com" target="_blank" class="footer-link">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" class="footer-link">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" class="footer-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-bottom-text">
          © 2024 Panfletos Exemplo. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
