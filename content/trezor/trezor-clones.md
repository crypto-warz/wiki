---
title: Клоны и форки Trezor
weight: 7
date: 2025-04-12
---

Trezor – пионеры на рынке аппаратных кошельков. Кошельки Trezor имеют открытый исходный код как прошивок, так и аппаратной архитектуры, что не могло не повлечь создания огромного количества реплик, клонов, коммерческих форков, модификаций и DIY-проектов на их основе. 

### KeepKey (2014)

Первый коммерческий форк Trezor One от компании ShapeShift. Использует собственное приложение для коммуникации с кошельком. Описание интересной уязвимости, позволявшей фактически вывести сид-фразу на экран устройства, доступно по [ссылке](https://blog.inhq.net/posts/keepkey-CVE-2023-27892/).

[Сайт](https://www.keepkey.com/), [GitHub](https://github.com/keepkey), [WalletScrutiny](https://walletscrutiny.com/hardware/keepKey/).

{{< carousel
    "img/trezor/trezor-clones-29.webp"
	"img/trezor/trezor-clones-30.webp"
	"img/trezor/trezor-clones-31.webp"
>}}

### B Wallet (2015)

Он же BWallet или MyBWallet, китайский клон Trezor One. Работал с собственным веб-приложением и не позволял устанавливать оригинальные прошивки от Trezor. Прославился тем, что был [изучен](https://www.reddit.com/r/Bitcoin/comments/2tyier/bwallet_review_by_trezor_developer/) разработчиками Trezor, и их выводы были весьма неожиданными:

> Интересным моментом в BWallet является то, что они практически ничего не изменили в исходном коде прошивки, кроме добавления отслеживающего идентификатора в API. Особое внимание стоит обратить на эту [строку](https://github.com/BWallet/bwallet-mcu/blob/2427d396c29722e1ddd70791aaeb12b55ae5d609/firmware/fsm.c#L148). Она отправляет серийный номер процессора на компьютер, а это значит, что они отслеживают, кто вы такой (они знают, на какое имя и адрес было отправлено устройство) и сколько у вас денег (так как BWallet передает этот идентификатор на сайт mybwallet.com).

Проект заброшен. [GitHub](https://github.com/BWallet), [WalletScrutiny](https://walletscrutiny.com/hardware/mybwallet/).

{{< carousel
    "img/trezor/trezor-clones-5.webp"
	"img/trezor/trezor-clones-6.webp"
	"img/trezor/trezor-clones-7.webp"
	"img/trezor/trezor-clones-8.webp"
	"img/trezor/trezor-clones-9.webp"
>}}

### eWallet (2015)

Еще один китайский клон с собственным загрузчиком, который позволял запускать оригинальную прошивку Trezor One. Производитель – Black Arrow.

Проект заброшен, код не публиковался. [WalletScrutiny](https://walletscrutiny.com/hardware/blackarrowsoftware.ewallet/).

{{< carousel
    "img/trezor/trezor-clones-21.webp"
	"img/trezor/trezor-clones-22.webp"
	"img/trezor/trezor-clones-23.webp"
>}}

### Trezor Dev Kit

DIY-проект по созданию устройств Trezor One и Trezor T на отладочных платах для разработчиков. Автор – mcudev.

[Сайт](https://mcudev.github.io/), [GitHub](https://github.com/mcudev/mcudev.github.io), [WalletScrutiny](https://walletscrutiny.com/hardware/mcudev.trezor.diy.devkit/).

{{< carousel
    "img/trezor/trezor-clones-53.webp"
	"img/trezor/trezor-clones-54.webp"
>}}

### PiTrezor (2018)

DIY-проект по запуску модифицированной прошивки Trezor One на Raspberry Pi.

[Сайт](https://www.pitrezor.com),  [мод прошивки на GitHub](https://github.com/heneault/trezor-firmware), [образ ОС на GitHub](https://github.com/heneault/yocto-pitrezor), [видео от Crypto Guide](https://www.youtube.com/watch?v=t9zNOsTXjvo), [WalletScrutiny](https://walletscrutiny.com/hardware/pitrezor/).

{{< carousel
    "img/trezor/trezor-clones-10.webp"
	"img/trezor/trezor-clones-11.webp"
	"img/trezor/trezor-clones-12.webp"
	"img/trezor/trezor-clones-13.webp"
>}}

### Safe-T mini (2018)

Клон Trezor One родом из Франции от компании Archos. Прошивка и первоначальные настройки, такие как создание бэкапа сид-фразы и установка пин-кода, осуществлялись с помощью собственного веб-приложения. Далее пользователю предлагалось подключиться к сторонним кошелькам, таким как Electrum, Electrum-LTC, Electrum Dash, MyCrypto и другим.

Проект заброшен. [GitHub](https://github.com/archos-safe-t), [WalletScrutiny](https://walletscrutiny.com/hardware/archossafetmini/).

{{< carousel
    "img/trezor/trezor-clones-39.webp"
	"img/trezor/trezor-clones-40.webp"
	"img/trezor/trezor-clones-41.webp"
>}}

### Trezor Mini (2018)

Российский клон Trezor One от компании Buratino Solutions. На устройство устанавливалась оригинальная прошивка Trezor One.

Проект заброшен. [Обзор на YouTube](https://www.youtube.com/watch?v=7IlsfXW_jL0).

{{< carousel
    "img/trezor/trezor-clones-24.webp"
	"img/trezor/trezor-clones-25.webp"
	"img/trezor/trezor-clones-26.webp"
	"img/trezor/trezor-clones-27.webp"
>}}

### Cerber (2018)

Еще один клон Trezor One из России. На официальном сайте проекта ссылка на интерфейс, в котором предлагалось инициализировать кошелек, вела на wallet.trezor.io.

Проект заброшен. [WalletScrutiny](https://walletscrutiny.com/hardware/cerber/).

{{< carousel
    "img/trezor/trezor-clones-35.webp"
	"img/trezor/trezor-clones-36.webp"
	"img/trezor/trezor-clones-37.webp"
	"img/trezor/trezor-clones-38.webp"
>}}

### Dorj (2018)

Клон Trezor из Ирана. Известны три версии кошелька: Dorj One, Dorj One Plus и Dorj T. Кошельки работают с оригинальным ПО от Trezor.

[Сайт](https://dorj.io), [WalletScrutiny](https://walletscrutiny.com/hardware/dorj.one/).

{{< carousel
    "img/trezor/trezor-clones-48.webp"
	"img/trezor/trezor-clones-49.webp"
	"img/trezor/trezor-clones-50.webp"
>}}

### Pong (2018)

Порт игры в Pong для Trezor One. Автор – Syscall 7.

[Сайт](https://syscall7.com/hacking-a-hardware-wallet/), [GitHub](https://github.com/syscall7/trezor-pong).

{{< carousel
    "img/trezor/trezor-clones-51.webp"
	"img/trezor/trezor-clones-52.webp"
>}}

### Corazon (2019)

Клон Trezor T,  родом из Сингапура. Представляет собой обычный Trezor T в алюминиевом или титановом корпусе и, по утверждению производителя, создан в коллаборации с Trezor.

[Сайт](https://gray.inc/collections/corazon-wallet), [WalletScrutiny](https://walletscrutiny.com/hardware/corazon/).

{{< carousel
    "img/trezor/trezor-clones-32.webp"
	"img/trezor/trezor-clones-33.webp"
	"img/trezor/trezor-clones-34.webp"
>}}

### OneKey (2020)

Он же BixinKey. Пожалуй, самый известный форк Trezor, родом из Китая. Первые модели неизвестны за пределами Китая. Одной из особенностей Bixin Key One было наличие NFC и Bluetooth для работы с собственным мобильным приложением.

Модифицированная модель, без поддержки NFC, была выпущена под другим брендом – OneKey Classic и позже модернизирована в OneKey Classic 1S. По сравнению с оригиналом, кошельки OneKey поддерживают большее количество криптовалют, например, Tron или Kaspa.

Другая модель на основе Trezor One, не имеющая беспроводных интерфейсов, – OneKey Mini, прославилась тем, что была моментально [взломана](https://web.archive.org/web/20230213033639/https://www.youtube.com/watch?v=b8OrakRJmHE&gl=US&hl=en) сразу после релиза в начале 2023 года, не смотря на наличие Secure Element. Уязвимость была закрыта, но позже кошелек был [взломан](https://blog.offside.io/p/one-key-bug-in-onekey-mini) еще раз.

Модели с тачскрином, OneKey Touch и OneKey Pro, являются форками Trezor T.

[Сайт](https://onekey.so/), [GitHub](https://github.com/OneKeyHQ/), [аппаратная архитектура Bixin на GitHub](https://github.com/OneKeyHQ/firmware/tree/bixin_dev/docs/pcb), [WalletScrutiny](https://walletscrutiny.com/hardware/onekey/).

{{< carousel
    "img/trezor/trezor-clones-14.webp"
	"img/trezor/trezor-clones-15.webp"
	"img/trezor/trezor-clones-16.webp"
	"img/trezor/trezor-clones-17.webp"
	"img/trezor/trezor-clones-18.webp"
	"img/trezor/trezor-clones-19.webp"
	"img/trezor/trezor-clones-20.webp"
	"img/trezor/trezor-clones-28.webp"
>}}

### E4pizor (2021)

Российский проект по созданию полной реплики Trezor One от команды ныне не существующего E4pool. Использует оригинальную аппаратную архитектуру и [загрузчик](https://github.com/trezor/data/blob/5d3473efc96a49b3613d49a37205097004e4e3a7/bootloader/1/bootloader-1.10.0.bin) от SatoshiLabs.

[Сайт](https://e4pizor.com/), [GitHub](https://github.com/e4p1k0/trezor-hardware), [видео о создании кошелька своими руками на YouTube](https://www.youtube.com/watch?v=wUIaTvsWSA0).

{{< carousel
    "img/trezor/trezor-clones-42.webp"
	"img/trezor/trezor-clones-43.webp"
	"img/trezor/trezor-clones-44.webp"
	"img/trezor/trezor-clones-45.webp"
	"img/trezor/trezor-clones-46.webp"
	"img/trezor/trezor-clones-47.webp"
>}}

### Prokey Optimum (2021)

Форк Trezor One родом из Канады. На ряду со стандартным набором поддерживаемых криптовалют, имеется поддержка XRP. Взаимодействие осуществляется с помощью собственного [веб-приложения](https://wallet.prokey.io/), а также доступна полноценная [демонстрация](https://demo.prokey.io/) работы с кошельком (можно использовать выдуманный email).

[Сайт](https://prokey.io/), [GitHub](https://github.com/prokey-io), [YouTube](https://www.youtube.com/@prokey_io), [WalletScrutiny](https://walletscrutiny.com/hardware/prokeyoptimum/).

{{< carousel
    "img/trezor/trezor-clones-2.webp"
	"img/trezor/trezor-clones-3.webp"
	"img/trezor/trezor-clones-4.webp"
	"img/trezor/trezor-clones-1.webp"
>}}

### Trezor One с портом USB-C (2023)

Модифицированная версия оригинального Trezor One с портом Type-C, другими кнопками и SMD-элементами размером 0603 вместо 0402. Автор – snark013.

[GitHub](https://github.com/snark013/trezor-one).

{{< carousel
    "img/trezor/trezor-clones-55.webp"
	"img/trezor/trezor-clones-56.webp"
>}}