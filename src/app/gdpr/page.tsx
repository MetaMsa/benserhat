import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  alternates: {
    canonical: "https://benserhat.com/gdpr"
  }
};

export default function Gdpr() {
  return (
    <div
      className="m-5 p-5 text-center border text-xs sm:text-sm bg-gray-900 rounded-2xl"
    >
      <h1>Gizlilik Politikası</h1>
      <p>
        <strong>Son güncelleme:</strong> 12 Ocak 2026
      </p>

      <p>
        Bu Gizlilik Politikası, benserhat.com (“Web Sitesi”) üzerinden sunulan
        hizmetler kapsamında toplanan kişisel verilerin hangi amaçlarla
        işlendiğini ve nasıl korunduğunu açıklamaktadır.
      </p>

      <h2>1. Toplanan Kişisel Veriler</h2>

      <h3>1.1. E-posta Adresi</h3>
      <p>
        Web Sitesinde yer alan yorum yapma özelliği kapsamında kullanıcılardan
        e-posta adresi talep edilebilir.
      </p>
      <p>Toplanan e-posta adresleri:</p>
      <ul>
        <li>Yapılan yorumların yönetilmesi,</li>
        <li>Kötüye kullanım ve spam faaliyetlerinin önlenmesi,</li>
        <li>Gerekli durumlarda kullanıcıyla iletişime geçilmesi</li>
      </ul>
      <p>amaçlarıyla kullanılır.</p>
      <p>
        E-posta adresleri{" "}
        <strong>pazarlama, reklam veya ticari iletişim</strong> amacıyla
        kullanılmaz ve üçüncü kişilerle paylaşılmaz.
      </p>

      <h3>1.2. IP Adresi ve Kullanım Verileri</h3>
      <p>
        Hizmetin güvenli şekilde sunulabilmesi ve kötüye kullanımın önlenmesi
        amacıyla aşağıdaki veriler otomatik olarak işlenebilir:
      </p>
      <ul>
        <li>IP adresi</li>
        <li>İstek zamanı ve sıklığı</li>
        <li>Temel teknik bilgiler (ör. tarayıcı isteği)</li>
      </ul>
      <p>Bu veriler:</p>
      <ul>
        <li>Like (beğeni) sisteminin kötüye kullanımını önlemek,</li>
        <li>Rate limit (istek sınırlandırma) uygulamak,</li>
        <li>Hizmet güvenliğini sağlamak</li>
      </ul>
      <p>amaçlarıyla işlenmektedir.</p>

      <h2>2. Çerezler (Cookies)</h2>
      <p>
        Web Sitesinde yalnızca <strong>zorunlu çerezler</strong>{" "}
        kullanılmaktadır.
      </p>
      <p>Bu çerezler:</p>
      <ul>
        <li>Like (beğeni) işlemlerinin kontrol edilmesi,</li>
        <li>Kötüye kullanımın önlenmesi,</li>
        <li>Hizmetin teknik olarak çalışabilmesi</li>
      </ul>
      <p>amaçlarıyla kullanılır.</p>
      <p>
        Zorunlu çerezler için açık rıza alınmaz ve bu çerezler pazarlama veya
        takip amacıyla kullanılmaz.
      </p>

      <h2>3. Kişisel Verilerin İşlenme Hukuki Sebebi</h2>
      <p>
        Kişisel veriler, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 5.
        maddesi uyarınca:
      </p>
      <ul>
        <li>Hizmetin sunulabilmesi,</li>
        <li>Meşru menfaatlerin korunması,</li>
        <li>Kötüye kullanımın önlenmesi</li>
      </ul>
      <p>hukuki sebeplerine dayanılarak işlenmektedir.</p>

      <h2>4. Kişisel Verilerin Saklanma Süresi</h2>
      <ul>
        <li>
          IP adresi ve güvenlik amaçlı veriler, yalnızca ilgili amaç için
          gerekli süre boyunca saklanır ve süre sonunda otomatik olarak silinir.
        </li>
        <li>
          E-posta adresleri, yorumun yayında kaldığı süre boyunca veya yasal
          yükümlülükler gereği gerekli olduğu müddetçe saklanır.
        </li>
      </ul>

      <h2>5. Kişisel Verilerin Aktarılması</h2>
      <p>Toplanan kişisel veriler:</p>
      <ul>
        <li>Üçüncü kişilerle paylaşılmaz,</li>
        <li>Reklam, pazarlama veya analiz hizmetlerine aktarılmaz.</li>
      </ul>
      <p>
        Yalnızca yasal yükümlülükler kapsamında yetkili kamu kurum ve
        kuruluşlarının talebi halinde paylaşım yapılabilir.
      </p>

      <h2>6. Veri Güvenliği</h2>
      <p>
        Kişisel verilerin güvenliği için teknik ve idari tedbirler alınmaktadır.
        Ancak internet üzerinden yapılan veri iletiminin %100 güvenli olduğu
        garanti edilemez.
      </p>

      <h2>7. Çocukların Gizliliği</h2>
      <p>
        Web Sitesi 13 yaş altındaki çocuklara yönelik değildir. Bilerek 13 yaş
        altındaki kişilerden kişisel veri toplanmaz.
      </p>

      <h2>8. Gizlilik Politikasındaki Değişiklikler</h2>
      <p>
        Bu Gizlilik Politikası gerekli görüldüğünde güncellenebilir. Güncel
        versiyon Web Sitesinde yayımlandığı tarihten itibaren geçerli olur.
      </p>

      <h2>9. İletişim</h2>
      <p>Bu Gizlilik Politikası ile ilgili sorularınız için:</p>
      <p>
        <strong>E-posta:</strong>
        <a href="mailto:mehmetserhataslan955@gmail.com">
          mehmetserhataslan955@gmail.com
        </a>
      </p>
    </div>
  );
}
