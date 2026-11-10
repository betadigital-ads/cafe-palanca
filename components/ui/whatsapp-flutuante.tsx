import { WHATSAPP } from "@/lib/contacto";

export function WhatsappFlutuante({ label }: { label: string }) {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="whatsapp-flutuante fixed bottom-5 right-5 z-navbar flex size-14 items-center justify-center overflow-hidden rounded-full bg-[#25d366] text-white shadow-lg shadow-black/40 isolate md:bottom-7 md:right-7"
    >
      <svg viewBox="0 0 32 32" aria-hidden className="relative size-8 fill-current">
        <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.72A12.94 12.94 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16.003 3zm0 23.6c-2 0-3.96-.54-5.67-1.56l-.4-.24-3.98 1.02 1.06-3.88-.26-.4A10.55 10.55 0 0 1 5.4 16c0-5.84 4.76-10.6 10.6-10.6S26.6 10.16 26.6 16s-4.76 10.6-10.6 10.6zm5.8-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
      </svg>
    </a>
  );
}
