---
title: Клоны и форки Trezor
weight: 7
date: 2025-04-12
---

Trezor – пионеры на рынке аппаратных кошельков. Кошельки Trezor имеют открытый исходный код как прошивок, так и аппаратной архитектуры, что не могло не повлечь создания огромного количества реплик, клонов, коммерческих форков, модификаций и DIY-проектов на их основе. 

### B Wallet

Он же BWallet или MyBWallet, китайский клон Trezor One из 2015 года. Работал с собственным веб-приложением и не позволял устанавливать оригинальные прошивки от Trezor. Прославился тем, что был [изучен](https://www.reddit.com/r/Bitcoin/comments/2tyier/bwallet_review_by_trezor_developer/) разработчиками Trezor, и их выводы были весьма неожиданными:

> Интересным моментом в BWallet является то, что они практически ничего не изменили в исходном коде прошивки, кроме добавления отслеживающего идентификатора в API. Особое внимание стоит обратить на эту [строку](https://github.com/BWallet/bwallet-mcu/blob/2427d396c29722e1ddd70791aaeb12b55ae5d609/firmware/fsm.c#L148). Она отправляет серийный номер процессора на компьютер, а это значит, что они отслеживают, кто вы такой (они знают, на какое имя и адрес было отправлено устройство) и сколько у вас денег (так как BWallet передает этот идентификатор на сайт mybwallet.com).

Проект заброшен. [GitHub](https://github.com/BWallet), [WalletScrutiny](https://walletscrutiny.com/hardware/mybwallet/)

{{< carousel
    "img/trezor/trezor-clones-5.webp"
	"img/trezor/trezor-clones-6.webp"
	"img/trezor/trezor-clones-7.webp"
	"img/trezor/trezor-clones-8.webp"
	"img/trezor/trezor-clones-9.webp"
>}}

### eWallet

Еще один китайский клон из 2015 года с собственным загрузчиком, который позволял запускать оригинальную прошивку Trezor One. Производитель – Black Arrow.

Проект заброшен, код не публиковался. [WalletScrutiny](https://walletscrutiny.com/hardware/blackarrowsoftware.ewallet/)

{{< carousel
    "img/trezor/trezor-clones-21.webp"
	"img/trezor/trezor-clones-22.webp"
	"img/trezor/trezor-clones-23.webp"
>}}

### PiTrezor

DIY-проект по запуску модифицированной прошивки Trezor One на Raspberry Pi, появившийся в 2018 году.

[Сайт](https://www.pitrezor.com),  [мод прошивки на GitHub](https://github.com/heneault/trezor-firmware), [образ ОС на GitHub](https://github.com/heneault/yocto-pitrezor), [видео от Crypto Guide](https://www.youtube.com/watch?v=t9zNOsTXjvo), [WalletScrutiny](https://walletscrutiny.com/hardware/pitrezor/)

{{< carousel
    "img/trezor/trezor-clones-10.webp"
	"img/trezor/trezor-clones-11.webp"
	"img/trezor/trezor-clones-12.webp"
	"img/trezor/trezor-clones-13.webp"
>}}

### OneKey

Он же BixinKey. Пожалуй, самый известный форк Trezor, родом из Китая. Первые модели неизвестны за пределами Китая и появились в 2020 году. Одной из особенностей Bixin Key One было наличие NFC и Bluetooth для работы с собственным мобильным приложением.

Модифицированная модель, без поддержки NFC, была выпущена под другим брендом – OneKey Classic и позже модернизирована в OneKey Classic 1S. По сравнению с оригиналом, кошельки OneKey поддерживают большее количество криптовалют, например, Tron или Kaspa.

Другая модель на основе Trezor One, не имеющая беспроводных интерфейсов, – OneKey Mini, прославилась тем, что была моментально [взломана](https://web.archive.org/web/20230213033639/https://www.youtube.com/watch?v=b8OrakRJmHE&gl=US&hl=en) сразу после релиза в начале 2023 года, не смотря на наличие Secure Element. Уязвимость была закрыта, но позже кошелек был [взломан](https://blog.offside.io/p/one-key-bug-in-onekey-mini) еще раз.

Модели с тачскрином, OneKey Touch и OneKey Pro, являются форками Trezor T.

[Сайт](https://onekey.so/), [GitHub](https://github.com/OneKeyHQ/), [аппаратная архитектура Bixin на GitHub](https://github.com/OneKeyHQ/firmware/tree/bixin_dev/docs/pcb), [WalletScrutiny](https://walletscrutiny.com/hardware/onekey/)

{{< carousel
    "img/trezor/trezor-clones-14.webp"
	"img/trezor/trezor-clones-15.webp"
	"img/trezor/trezor-clones-16.webp"
	"img/trezor/trezor-clones-17.webp"
	"img/trezor/trezor-clones-18.webp"
	"img/trezor/trezor-clones-19.webp"
	"img/trezor/trezor-clones-20.webp"
>}}

### Prokey Optimum

Форк Trezor One родом из Канады, выпущенный в 2021 году. На ряду со стандартным набором поддерживаемых криптовалют, имеется поддержка XRP. Взаимодействие осуществляется с помощью собственного [веб-приложения](https://wallet.prokey.io/), а также доступна полноценная [демонстрация](https://demo.prokey.io/) работы с кошельком (можно использовать выдуманный email).

[Сайт](https://prokey.io/), [GitHub](https://github.com/prokey-io), [YouTube](https://www.youtube.com/@prokey_io), [WalletScrutiny](https://walletscrutiny.com/hardware/prokeyoptimum/)

{{< carousel
    "img/trezor/trezor-clones-2.webp"
	"img/trezor/trezor-clones-3.webp"
	"img/trezor/trezor-clones-4.webp"
	"img/trezor/trezor-clones-1.webp"
>}}