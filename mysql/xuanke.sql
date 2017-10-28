/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : xuanke

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-10-26 17:20:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '1');

-- ----------------------------
-- Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `class_id` char(255) NOT NULL,
  `class_name` char(255) NOT NULL,
  `class_score` char(11) NOT NULL,
  `class_time` char(255) NOT NULL,
  `class_room` char(255) DEFAULT NULL,
  `class_teacher` char(255) DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('123', '大学英语', '6', '2.30', '教七201', '谷老师');
INSERT INTO `course` VALUES ('2015', '面向对象程序设计', '4', '2.00', '教七220', '李老师');
INSERT INTO `course` VALUES ('321', '大学语文', '1.5', '10.00', '教八101', '李老师');
INSERT INTO `course` VALUES ('456', '高等数学', '3', '3.40', '教七508', '熊老师');
INSERT INTO `course` VALUES ('789', '大学物理', '6', '8.00', '教十202', '曹老师');
INSERT INTO `course` VALUES ('abc123', '线性代数', '3.5', '2.37', '教七302', '华老师');

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` char(255) NOT NULL,
  `name` char(255) NOT NULL,
  `class` char(255) NOT NULL,
  `sex` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1020', '阳镇杰', '电子1502', '男', '123');
INSERT INTO `student` VALUES ('110', '张泽路', '信息1501', '男', '123');
INSERT INTO `student` VALUES ('123', '韩文婷', '化工1501', '女', '123456');
INSERT INTO `student` VALUES ('12345', '左林宜', '物理1501', '男', '123');
INSERT INTO `student` VALUES ('666', '赵云鹏', '信息1501', '男', '123');
INSERT INTO `student` VALUES ('abcd', '一二三', '信息1501', '男', '123');

-- ----------------------------
-- Table structure for `teacher`
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` char(255) NOT NULL,
  `name` char(255) NOT NULL,
  `rank` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', '谷老师', '教授', '123');
INSERT INTO `teacher` VALUES ('2', '熊老师', '教授', '123');
INSERT INTO `teacher` VALUES ('3', '华老师', '教授', '123');
INSERT INTO `teacher` VALUES ('4', '李老师', '教授', '123');
INSERT INTO `teacher` VALUES ('5', '王老师', '教授', '123');

-- ----------------------------
-- Table structure for `xuanke`
-- ----------------------------
DROP TABLE IF EXISTS `xuanke`;
CREATE TABLE `xuanke` (
  `class_id` char(255) NOT NULL,
  `id` char(255) NOT NULL,
  `score` char(255) DEFAULT NULL,
  PRIMARY KEY (`class_id`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xuanke
-- ----------------------------
INSERT INTO `xuanke` VALUES ('123', '1020', '2');
INSERT INTO `xuanke` VALUES ('123', '110', '3');
INSERT INTO `xuanke` VALUES ('123', '123', '4');
INSERT INTO `xuanke` VALUES ('123', '666', '未录入');
INSERT INTO `xuanke` VALUES ('2015', '1020', '未录入');
INSERT INTO `xuanke` VALUES ('2015', '110', '未录入');
INSERT INTO `xuanke` VALUES ('2015', '12345', '未录入');
INSERT INTO `xuanke` VALUES ('2015', '666', '未录入');
INSERT INTO `xuanke` VALUES ('321', '1020', '未录入');
INSERT INTO `xuanke` VALUES ('321', '110', '未录入');
INSERT INTO `xuanke` VALUES ('456', '1020', '未录入');
INSERT INTO `xuanke` VALUES ('456', '110', '未录入');
INSERT INTO `xuanke` VALUES ('789', '1020', '未录入');
INSERT INTO `xuanke` VALUES ('789', '666', '未录入');
INSERT INTO `xuanke` VALUES ('abc123', '110', '未录入');
INSERT INTO `xuanke` VALUES ('abc123', '666', '未录入');
