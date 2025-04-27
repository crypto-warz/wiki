---
title: Сборка прошивки Trezor One из исходного кода
weight: 9
date: 2025-04-23
---

## Подготовка

- [Виртуальная машина](linux/virtualbox) VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 30 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора
- [Правила udev](linux/udev-rules) для установки прошивки на устройство

## Зависимости

```bash
sudo apt install git gcc-arm-none-eabi python3-poetry python3-pip libsdl2-dev libsdl2-image-dev protobuf-compiler
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
python3 -m pip install trezor
```

## Получение исходного кода

```bash
git clone --recurse-submodules https://github.com/trezor/trezor-firmware ~/trezor-firmware
cd trezor-firmware/
```

На этом этапе необходимо определить, какую версию прошивки вы хотите собрать самостоятельно. Обратите внимание, что установить версию прошивки ниже, чем текущая версия **загрузчика**, находящегося на устройстве, не получится. Узнать текущую версию загрузчика можно с помощью следующих команд:

```bash
trezorctl device reboot-to-bootloader
# Подтвердите действие на устройстве
trezorctl get-features
# Версия загрузчика также отобразится на экране устройства
```

Подробнее об особенностях прошивки Trezor One можно узнать из [этого](trezor/trezor-one-check) материала. Для сборки рекомендуется использовать не последнюю версию кода, а откатиться на момент выхода нужной версии прошивки с помощью [тегов](https://github.com/trezor/trezor-firmware/tags). Для Trezor One прошивки обозначены тегом *legacy/v[номер версии]*. В данном руководстве будет использована прошивка legacy/v1.12.1:

```bash
git checkout legacy/v1.12.1
```

Устанавливаем дополнительные зависимости:

```bash
cd legacy/
poetry install
```

Внесем небольшое изменение в файл *script/bootstrap*:

```bash
nano script/bootstrap
```

Замените строку:

```
git submodule update --init --recursive
```

на:

```
git submodule update --init --recursive --force --remote
```

Последовательно нажмите _Ctrl+X_, _Y_ и _Enter_ для сохранения изменений и выхода из редактора nano.

## Сборка эмулятора

```bash
cd ~/trezor-firmware/legacy/
poetry run ./script/setup
export EMULATOR=1
poetry run ./script/cibuild
```

Готовый файл **trezor.elf** будет находиться в поддиректории **firmware**.

### Запуск эмулятора

```bash
cd ~/trezor-firmware/legacy/
# Значение TREZOR_OLED_SCALE отвечает за увеличение экрана эмулятора
TREZOR_OLED_SCALE=4 ./firmware/trezor.elf
```

## Сборка и установка прошивки

```bash
cd ~/trezor-firmware/legacy/
poetry run ./script/setup
export EMULATOR=0 PRODUCTION=0
poetry run ./script/cibuild
```

Готовый файл **trezor.bin** будет находиться в поддиректории **firmware**.

### Сброс устройства

Рекомендуется полностью стереть данные с устройства перед установкой собственной прошивки.

> Перед сбросом устройства проверьте валидность резервной копии вашей сид-фразы, перейдя в настройки Trezor Suite > **Устройство** > **Проверить резервную копию**.

```bash
# Перезагрузитесь в режим загрузчика
trezorctl device reboot-to-bootloader
# Подтвердите действие на устройстве
trezorctl device wipe --bootloader
# Переподключите устройство
```

Другой способ войти в режим загрузчика: зажать левую клавишу на Trezor и подключить кабель питания.

### Прошивка устройства

```bash
cd ~/trezor-firmware/legacy/
trezorctl firmware update -f firmware/trezor.bin
# Подтвердите действие на устройстве
```

> Во время сборки и установки будет отображен отпечаток прошивки (Firmware fingerprint). Он же будет отображаться при каждом запуске устройства.

## Модификация прошивки

Пример модификации прошивки с установкой порта игры Pong.

> [Статья о создании собственного порта на английском](https://syscall7.com/hacking-a-hardware-wallet/)
> 
> [Оригинальный репозиторий Trezor Pong](https://github.com/syscall7/trezor-pong)

Оригинальный порт написан для старых версий прошивок и во многом не совместим с современным кодом Trezor One. Кроме того, в репозитории проекта содержится только код эмулятора. Модифицированный код, проверенный на прошивке 1.12.1, доступен по [ссылке](https://github.com/crypto-warz/trezor-pong). Вы можете самостоятельно [ознакомиться](https://github.com/crypto-warz/trezor-pong/commit/19656aed0f9fd49b02b45eb163627e69ec55143b) с изменениями по сравнению с оригиналом.

- Получите код Trezor Pong:

    ```bash
    cd
    git clone https://github.com/crypto-warz/trezor-pong ~/trezor-pong
    ```

- Скопируйте файлы **trezor-pong.c**, **trezor-sdl.c** и **trezor-sdl.h** в поддиректорию **firmware** в исходном коде прошивки:

    ```bash
    cd ~/trezor-firmware/legacy/
    cp ~/trezor-pong/*.c ~/trezor-pong/*.h firmware/
    ```

- Отредактируйте код основного файла прошивки **firmware/trezor.c**:

    ```bash
    nano firmware/trezor.c
    ```

    В начале файла добавьте `#include "trezor-pong.c"`:

    ```
    ...
    #include "otp.h"
    #endif
    #ifdef USE_SECP256K1_ZKP
    #include "zkp_context.h"
    #endif
    #include "trezor-pong.c"
    ...
    ```

    Найдите функцию `collect_hw_entropy` и замените:

    ```
    static void collect_hw_entropy(bool privileged) {
    ```

    на:

    ```
    void collect_hw_entropy(bool privileged) {
    ```

    В самом конце файла вставьте `pong_main();` после `usbInit();`:

    ```
    ...
      config_init();
      layoutHome();
      usbInit();
      pong_main();
      for (;;) {
    ...
    ```

    Последовательно нажмите _Ctrl+X_, _Y_ и _Enter_ для сохранения изменений и выхода из редактора nano.

- Отредактируйте Makefile

    ```bash
    nano Makefile
    ```

    После `OBJS += winusb.o` добавьте:

    ```
    ...
    OBJS += util.o
    OBJS += webusb.o
    OBJS += winusb.o
    
    ifeq ($(EMULATOR),1)
    OBJS += firmware/trezor-pong.o
    OBJS += firmware/trezor-sdl.o
    endif
    ...
    ```

- Соберите и запустите эмулятор по [инструкции](trezor/trezor-one-fw-build/#%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-%D1%8D%D0%BC%D1%83%D0%BB%D1%8F%D1%82%D0%BE%D1%80%D0%B0).

- Соберите и установите прошивку по [инструкции](trezor/trezor-one-fw-build/#%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-%D0%B8-%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B8).

{{< carousel
    "img/trezor/trezor-one-fw-build-1.webp"
	"img/trezor/trezor-one-fw-build-2.webp"
	"img/trezor/trezor-one-fw-build-3.webp"
	"img/trezor/trezor-one-fw-build-4.webp"
	"img/trezor/trezor-one-fw-build-5.webp"
	"img/trezor/trezor-one-fw-build-6.webp"
>}}