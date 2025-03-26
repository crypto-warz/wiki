---
title: Эмулятор Trezor
weight: 4
---

{{% image src="img/trezor/trezor-emu-1.webp" /%}}

## Подготовка

- Виртуальная машина VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 30 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора

## Зависимости

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

sudo apt install git ca-certificates curl

sudo install -m 0755 -d /etc/apt/keyrings

sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo usermod -a -G docker $USER
```

Выполнив последнюю команду, необходимо выйти из системы и выполнить логин, или перезагрузить виртуальную машину.

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