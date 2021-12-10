
from os import stat
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
from PIL import Image
from torch.autograd import Variable
from matplotlib import pyplot as plt
import time
import argparse
import sys
import os

folder_path = "./Inference/data/"

files = os.listdir(folder_path)
for f in files:
    image_name = f

image_path = "./Inference/data/" + image_name


model_path = "./Inference/model/model.pt"

model = models.resnet18(pretrained=True)

model.fc = torch.nn.Linear(in_features=512, out_features=3)
loss_fn = torch.nn.CrossEntropyLoss()

model.load_state_dict(torch.load(
    model_path, map_location=torch.device('cpu')))

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# device = torch.device('cpu')
model = model.to(device)

#optimizer = torch.optim.Adam(model.parameters(), lr=3e-5)

imsize = 256
loader = transforms.Compose(
    [transforms.Scale(imsize), transforms.ToTensor()])


def image_loader(image_name):
    """load image, returns cuda tensor"""

    image = Image.open(image_name)
    image = loader(image).float()
    image = Variable(image, requires_grad=True)
    # this is for VGG, may not be needed for ResNet
    image = image.unsqueeze(0)

    return image.cpu()  # assumes that you're using GPU

# image = image_loader('./C_78.jpg')

# s = time.time()
# op = model(image)
# pred = op.data.max(1, keepdim=True)[1]
# e = time.time()

# e-s

#test_healthy = './data/1.jpg'


def inference(img_path):

    image = image_loader(img_path)

    op = model(image)
    pred = int(op.data.max(1, keepdim=True)[1])

    if (pred == 0):
        return "Healthy"
    elif (pred == 1):
        return "Resistant"
    else:
        return "Susceptible"


result = inference(image_path)
print(result)
sys.stdout.flush()
