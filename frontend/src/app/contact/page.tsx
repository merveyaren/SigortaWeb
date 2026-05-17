'use client';
import { useState } from 'react';
import PageBanner from '@/components/PageBanner';
import { apiService } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // 1. Veritabanına Kaydet (Django API)
      const res = await apiService.sendContactMessage(form);
      
      // 2. Web3Forms ile Arkadaşınızın Mailine Gönder
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';
      if (web3Key) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: web3Key,
              subject: `Insucom Sigorta - Yeni Mesaj: ${form.name}`,
              from_name: 'Insucom Web',
              name: form.name,
              email: form.email,
              message: form.message,
            }),
          });
        } catch (emailErr) {
          console.error('E-posta gönderimi başarısız oldu, ancak veritabanına kaydedildi:', emailErr);
        }
      }

      if (res.status === 200 || res.status === 201) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageBanner title="Contact" breadcrumb="Contact" />
      {/* Contact Info Cards */}
      <div className="faq-page-wrapper lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        <div className="theme-container mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 lg:gap-[30px] gap-5">
            {/* Address Card */}
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" style={{ boxShadow: '0px 4.4px 12px -1px rgba(19, 16, 34, 0.06), 0px 2px 6.4px -1px rgba(19, 16, 34, 0.03)' }} className="item w-full">
              <div className="w-full lg:h-[324px] h-[290px] relative overflow-hidden xl:bg-white bg-primary-50 rounded">
                <div className="flex justify-center">
                  <div>
                    <div className="mt-[50px] xl:mb-[90px] mb-10 flex justify-center relative z-10">
                      <span>
                        <svg width="30" height="41" viewBox="0 0 30 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.125 39.0625C9.0625 33.9844 0 21.875 0 15C0 6.71875 6.64062 0 15 0C23.2812 0 30 6.71875 30 15C30 21.875 20.8594 33.9844 16.7969 39.0625C15.8594 40.2344 14.0625 40.2344 13.125 39.0625ZM15 20C17.7344 20 20 17.8125 20 15C20 12.2656 17.7344 10 15 10C12.1875 10 10 12.2656 10 15C10 17.8125 12.1875 20 15 20Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                    <p className="sm:text-[30px] font-semibold spline-sans sm:leading-[36px] text-2xl text-center text-primary-900 mb-3">Address</p>
                    <p className="text-base leading-[27px] text-primary-100 text-center">Dhaka 102, utl 1216, road 45 <br />house of street</p>
                    <div className="w-[300px] h-[300px] rounded-full bg-primary-50 absolute left-[55px] bottom-[174px] xl:block hidden"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" style={{ boxShadow: '0px 4.4px 12px -1px rgba(19, 16, 34, 0.06), 0px 2px 6.4px -1px rgba(19, 16, 34, 0.03)' }} className="item w-full">
              <div className="w-full lg:h-[324px] h-[290px] relative overflow-hidden xl:bg-white bg-primary-50 rounded">
                <div className="flex justify-center">
                  <div>
                    <div className="mt-[50px] xl:mb-[90px] mb-10 flex justify-center relative z-10">
                      <span>
                        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M36.25 0C38.2812 0 40 1.71875 40 3.75C40 5 39.375 6.09375 38.4375 6.79688L21.4844 19.5312C20.5469 20.2344 19.375 20.2344 18.4375 19.5312L1.48438 6.79688C0.546875 6.09375 0 5 0 3.75C0 1.71875 1.64062 0 3.75 0H36.25ZM16.9531 21.5625C18.75 22.8906 21.1719 22.8906 22.9688 21.5625L40 8.75V25C40 27.8125 37.7344 30 35 30H5C2.1875 30 0 27.8125 0 25V8.75L16.9531 21.5625Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                    <p className="sm:text-[30px] font-semibold spline-sans sm:leading-[36px] text-2xl text-center text-primary-900 mb-3">E-mail</p>
                    <p className="text-base leading-[27px] text-primary-100 text-center">an000@yourmail.com <br />Suppport@emailhub.net.com</p>
                    <div className="w-[300px] h-[300px] rounded-full bg-primary-50 absolute left-[55px] bottom-[174px] xl:block hidden"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" style={{ boxShadow: '0px 4.4px 12px -1px rgba(19, 16, 34, 0.06), 0px 2px 6.4px -1px rgba(19, 16, 34, 0.03)' }} className="item w-full">
              <div className="w-full lg:h-[324px] h-[290px] relative overflow-hidden xl:bg-white bg-primary-50 rounded">
                <div className="flex justify-center">
                  <div>
                    <div className="mt-[50px] xl:mb-[90px] mb-10 flex justify-center relative z-10">
                      <span>
                        <svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M39.9219 31.2344L38.0469 39.125C37.8125 40.2969 36.875 41.0781 35.7031 41.0781C16.0156 41 0 24.9844 0 5.29688C0 4.125 0.703125 3.1875 1.875 2.95312L9.76562 1.07812C10.8594 0.84375 12.0312 1.46875 12.5 2.48438L16.1719 11C16.5625 12.0156 16.3281 13.1875 15.4688 13.8125L11.25 17.25C13.9062 22.6406 18.2812 27.0156 23.75 29.6719L27.1875 25.4531C27.8125 24.6719 28.9844 24.3594 30 24.75L38.5156 28.4219C39.5312 28.9688 40.1562 30.1406 39.9219 31.2344Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                    <p className="sm:text-[30px] font-semibold spline-sans sm:leading-[36px] text-2xl text-center text-primary-900 mb-3">Call us</p>
                    <p className="text-base leading-[27px] text-primary-100 text-center">0000 - 000 - 000 00 <br />+1234 - 000</p>
                    <div className="w-[300px] h-[300px] rounded-full bg-primary-50 absolute left-[55px] bottom-[174px] xl:block hidden"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <section className="w-full h-[650px] xl:-mt-[80px] mt-[60px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13026958.232207906!2d-106.25368284273397!3d37.14295599588203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1686425287457!5m2!1sen!2sbd"
            style={{ border: 0, width: '100%', height: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        {/* Contact Form Section */}
        <section className="w-full lg:pt-[120px] pt-[60px] pb-[120px] lg:pb-0">
          <div className="theme-container mx-auto">
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center">
              <div className="mb-10 lg:mb-0">
                <p className="text-primary-500 font-bold lg:leading-8 spline-sans lg:text-xl text-lg uppercase mb-2">GET IN TOUCH</p>
                <h2 className="headline-default text-primary-900 mb-[30px]">The Trusted Partner <br />in Protecting Your</h2>
                <p className="text-base leading-[27px] text-primary-100">
                  ished fact that a reader will be distrol acted bioiiy <br />
                  desig ished fact that a reader will acted ished fact <br />
                  that a reader will be distrol acted bioiiy desig ished <br />
                  fact that a reader will acted
                </p>
              </div>
              <div className="w-full">
                {status === 'sent' && <div className="mb-5 p-4 bg-green-50 text-green-700 rounded-lg">Mesajınız gönderildi! Teşekkürler.</div>}
                {status === 'error' && <div className="mb-5 p-4 bg-red-50 text-red-700 rounded-lg">Bir hata oluştu. Lütfen tekrar deneyin.</div>}
                <form onSubmit={handleSubmit}>
                  <div className="sm:flex sm:space-x-[30px] w-full mb-5">
                    <label className="block w-full mb-5 sm:mb-0" htmlFor="Name">
                      <input id="Name" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                        className="w-full h-[68px] rounded border border-primaryBorder focus:outline-none focus:ring-0 px-5 placeholder:text-primary-100 text-black" />
                    </label>
                    <label className="block w-full" htmlFor="email">
                      <input id="email" type="email" placeholder="E-mail" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                        className="w-full h-[68px] rounded border border-primaryBorder focus:outline-none focus:ring-0 px-5 placeholder:text-primary-100 text-black" />
                    </label>
                  </div>
                  <div className="w-full h-[174px] mb-5">
                    <textarea name="message" id="message" placeholder="Write your message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required
                      className="w-full h-full rounded border border-primaryBorder focus:outline-none focus:ring-0 p-5 placeholder:text-primary-100 text-black"></textarea>
                  </div>
                  <div>
                    <button type="submit" disabled={status === 'sending'}
                      className="rounded bg-primary-500 hover:bg-primary-900 common-trans focus:outline-none focus:ring-0 w-full h-[68px] text-white flex justify-center items-center disabled:opacity-50">
                      <span className="text-lg font-semibold spline-sans text-white">{status === 'sending' ? 'Sending...' : 'Submit Now'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
