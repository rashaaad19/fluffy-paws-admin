import {  Image } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { ScrollView } from "react-native";

const GallerySection = ({ images }) => {
  return (
    <Card
      style={{
        marginTop: 16,
        backgroundColor: "white",
        borderRadius: 0,
      }}
      elevation={0}
    >
      <Card.Title title="Gallery" titleStyle={{ fontWeight: "bold" }} />
      <Card.Content>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 8 }}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img.cdnUrl }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            />
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default GallerySection;
