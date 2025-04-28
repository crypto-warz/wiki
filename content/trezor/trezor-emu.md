---
title: Эмулятор Trezor
weight: 4
date: 2025-03-27
---

{{% image src="img/trezor/trezor-emu-1.webp" /%}}

## Подготовка

- [Виртуальная машина](linux/virtualbox) VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 30 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора
- Установленный [Docker](linux/docker)

## Установка эмулятора

```bash
git clone https://github.com/trezor/trezor-user-env ~/trezor-user-env
```

## Запуск эмулятора

```bash
cd ~/trezor-user-env
./run.sh
```

Интерфейс эмулятора доступен через браузер по адресу http://localhost:9002/. Эмулятор позволяет запускать множество версий прошивок всех устройств Trezor, а также Trezor Bridge.

{{% image src="img/trezor/trezor-emu-2.webp" /%}}