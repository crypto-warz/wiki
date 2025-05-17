---
title: Установка утилиты Bitcoin eXplorer (BX)
weight: 5
date: 2025-04-07
---

## Подготовка

- [Виртуальная машина](linux/virtualbox) VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 30 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора

## Зависимости

```bash
sudo apt install libboost-all-dev build-essential gcc g++ cmake automake autoconf libtool pkg-config git wget
```

## Сборка из исходного кода

```bash
git clone https://github.com/libbitcoin/libbitcoin-explorer -b version3 ~/libbitcoin-explorer
cd ~/libbitcoin-explorer
sudo ./install.sh --with-icu --build-icu --build-zmq
```

## Использование

После успешной сборки команда **bx** станет доступна в системе. Тест:

```bash
bx hd-new 2b4c80bd8cfb66b8a4c923cc24962c9e2ebd461d2c6fb79667b7a0769600692cd697ba370cfa27045689360e5afe812efb13d1dec1b9eaf0e3fb4a4e0a47768d
```

```
xprv9s21ZrQH143K4b8jGAwHMRPpCgoFa7fbJ3xbXnfqTUdFd9WKdVZ4Eum7gWBaiVvDMSMe8sh8ypyCKwwHN3e5JmMGDjoJJcBoWBk6cQHDDV8
```

Команда преобразует шестнадцатеричный seed в xPriv, подробнее см. в [этом](bitcoin/multibit-hd/#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-xpriv-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-%D1%83%D1%82%D0%B8%D0%BB%D0%B8%D1%82%D1%8B-%D1%8F%D0%BD%D0%B0-%D0%BA%D0%BE%D1%83%D0%BB%D0%BC%D0%B0%D0%BD%D0%B0) материале.

После успешной установки директорию с исходным кодом можно удалить:

```bash
rm -rf ~/libbitcoin-explorer
```