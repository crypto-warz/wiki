---
title: Восстановление кошелька MultiBit HD
weight: 3
date: 2025-04-07
---

### Исходные данные

- Установлен кошелек MultiBit HD, но не синхронизируется.
- Сид-фраза утеряна.
- Известен пароль кошелька.

### Подготовка

- [Виртуальная машина](linux/virtualbox) VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- Файл бэкапа MultiBit HD **mbhd.wallet.aes**

> Путь к директории с файлом бэкапа можно найти в меню MultiBit HD: **Управление кошельком** > **Приборная панель кошелька** > Папка приложения/Папка кошелька.

- [Sparrow Wallet](https://sparrowwallet.com/)
- [bip39-standalone.html](https://github.com/iancoleman/bip39/releases/latest)

### Зависимости

```bash
sudo apt install python2 wget git nano

wget https://bootstrap.pypa.io/pip/2.7/get-pip.py

sudo python2 get-pip.py

rm get-pip.py

python2 -m pip install protobuf pylibscrypt bitcoin
```

### Установка программы восстановления MultiBit HD

```bash
git clone https://github.com/HardCorePawn/multibit_recovery ~/multibit_recovery

cd ~/multibit_recovery

nano +198 find_unspent_multibitHD_txes.py
```

В файл *find_unspent_multibitHD_txes.py* добавьте следующую строку:

```
       print("Seed (HEX):", seed.encode("hex"))
```

после:

```
       seed = aes256_cbc_decrypt(wkey.encrypted_deterministic_seed.encrypted_private_key, dkey, wkey.encrypted_deterministic_seed.initialisation_vector)
```

, согласно этого [коммита](https://github.com/crypto-warz/multibit_recovery/commit/2756ead99eabddad30b18cffc79530e6fb835269).

Последовательно нажмите *Ctrl+X*, *Y* и *Enter* для сохранения изменений и выхода из редактора nano.

> Вы можете сразу склонировать репозиторий с нужным исправлением:
> 
> ```bash
> git clone https://github.com/crypto-warz/multibit_recovery ~/multibit_recovery
> ```

### Получение seed

Скопируйте файл **mbhd.wallet.aes** в директорию **~/multibit_recovery**.

```bash
cd ~/multibit_recovery

python2 find_unspent_multibitHD_txes.py mbhd.wallet.aes
```

```
This wallet file is encrypted, please enter its password:
```

Введите пароль от кошелька MultiBit HD и нажмите *Enter*. Дождитесь появления строки с вашим seed:

```
Finding Seed....Seed (HEX): 2b4c80bd8cfb66b8a4c923cc24962c9e2ebd461d2c6fb79667b7a0769600692cd697ba370cfa27045689360e5afe812efb13d1dec1b9eaf0e3fb4a4e0a47768d
```

Скопируйте seed и остановите программу, нажав *Ctrl+C*.

### Получение xPriv с помощью утилиты Яна Коулмана

- Откройте скачанный файл **bip39-standalone.html** в браузере.
- Вставьте полученный ранее seed в поле **BIP39 Seed**.
- Скопируйте значение **BIP32 Root Key**.

{{% image src="img/bitcoin/multibithd-1.webp" /%}}

> Также вы можете использовать [утилиту BX](bitcoin/bx-install/#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5) для получения xPriv из seed.

### Восстановление кошелька в Sparrow Wallet

- Создайте новый кошелек в Sparrow Wallet: **File** > **New Wallet** > введите имя кошелька > **Create Wallet**.
- На вкладке **Settings** выберите **Legacy (P2PKH)** в списке **Script Type**.
- Нажмите **New or Imported Software Wallet** > в опции  **Master Private Key (BIP32)** нажмите кнопку **Enter Private Key** > вставьте ключ, полученный с помощью утилиты BIP39 > нажмите **Import**.

{{% image src="img/bitcoin/multibithd-2.webp" /%}}

- Измените путь деривации на **m/0'** и нажмите **Import Custom Derivation Keystore**.

{{% image src="img/bitcoin/multibithd-3.webp" /%}}

После импорта ключа, нажмите **Apply** в правом нижнем углу окна Sparrow Wallet и создайте пароль для кошелька.

Кошелек успешно восстановлен.